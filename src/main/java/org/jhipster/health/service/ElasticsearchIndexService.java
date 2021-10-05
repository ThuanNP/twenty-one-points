package org.jhipster.health.service;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;
import javax.persistence.ManyToMany;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.jhipster.health.domain.*;
import org.jhipster.health.repository.*;
import org.jhipster.health.repository.search.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

  private static final Lock reindexLock = new ReentrantLock();

  private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

  private final BloodPressureRepository bloodPressureRepository;

  private final BloodPressureSearchRepository bloodPressureSearchRepository;

  private final PointRepository pointRepository;

  private final PointSearchRepository pointSearchRepository;

  private final PreferencesRepository preferencesRepository;

  private final PreferencesSearchRepository preferencesSearchRepository;

  private final WeightRepository weightRepository;

  private final WeightSearchRepository weightSearchRepository;

  private final UserRepository userRepository;

  private final UserSearchRepository userSearchRepository;

  private final ElasticsearchTemplate elasticsearchTemplate;

  public ElasticsearchIndexService(
    UserRepository userRepository,
    UserSearchRepository userSearchRepository,
    BloodPressureRepository bloodPressureRepository,
    BloodPressureSearchRepository bloodPressureSearchRepository,
    PointRepository pointRepository,
    PointSearchRepository pointSearchRepository,
    PreferencesRepository preferencesRepository,
    PreferencesSearchRepository preferencesSearchRepository,
    WeightRepository weightRepository,
    WeightSearchRepository weightSearchRepository,
    ElasticsearchTemplate elasticsearchTemplate
  ) {
    this.userRepository = userRepository;
    this.userSearchRepository = userSearchRepository;
    this.bloodPressureRepository = bloodPressureRepository;
    this.bloodPressureSearchRepository = bloodPressureSearchRepository;
    this.pointRepository = pointRepository;
    this.pointSearchRepository = pointSearchRepository;
    this.preferencesRepository = preferencesRepository;
    this.preferencesSearchRepository = preferencesSearchRepository;
    this.weightRepository = weightRepository;
    this.weightSearchRepository = weightSearchRepository;
    this.elasticsearchTemplate = elasticsearchTemplate;
  }

  @Async
  @Timed
  public void reindexAll() {
    if (reindexLock.tryLock()) {
      try {
        reindexForClass(BloodPressure.class, bloodPressureRepository, bloodPressureSearchRepository);
        reindexForClass(Point.class, pointRepository, pointSearchRepository);
        reindexForClass(Preferences.class, preferencesRepository, preferencesSearchRepository);
        reindexForClass(Weight.class, weightRepository, weightSearchRepository);
        reindexForClass(User.class, userRepository, userSearchRepository);

        log.info("Elasticsearch: Successfully performed reindexing");
      } finally {
        reindexLock.unlock();
      }
    } else {
      log.info("Elasticsearch: concurrent reindexing attempt");
    }
  }

  @SuppressWarnings("unchecked")
  private <T, ID extends Serializable> void reindexForClass(
    Class<T> entityClass,
    JpaRepository<T, ID> jpaRepository,
    ElasticsearchRepository<T, ID> elasticsearchRepository
  ) {
    elasticsearchTemplate.deleteIndex(entityClass);
    try {
      elasticsearchTemplate.createIndex(entityClass);
    } catch (IndexAlreadyExistsException e) {
      // Do nothing. Index was already concurrently recreated by some other service.
    }
    elasticsearchTemplate.putMapping(entityClass);
    if (jpaRepository.count() > 0) {
      // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
      List<Method> relationshipGetters = Arrays
        .stream(entityClass.getDeclaredFields())
        .filter(field -> field.getType().equals(Set.class))
        .filter(field -> field.getAnnotation(ManyToMany.class) != null)
        .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
        .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
        .map(field -> {
          try {
            return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
          } catch (IntrospectionException e) {
            log.error(
              "Error retrieving getter for class {}, field {}. Field will NOT be indexed",
              entityClass.getSimpleName(),
              field.getName(),
              e
            );
            return null;
          }
        })
        .filter(Objects::nonNull)
        .collect(Collectors.toList());

      int size = 100;
      for (int i = 0; i <= jpaRepository.count() / size; i++) {
        Pageable page = new PageRequest(i, size);
        log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
        Page<T> results = jpaRepository.findAll(page);
        results.map(result -> {
          // if there are any relationships to load, do it now
          relationshipGetters.forEach(method -> {
            try {
              // eagerly load the relationship set
              ((Set) method.invoke(result)).size();
            } catch (Exception ex) {
              log.error(ex.getMessage());
            }
          });
          return result;
        });
        elasticsearchRepository.save(results.getContent());
      }
    }
    log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
  }
}
