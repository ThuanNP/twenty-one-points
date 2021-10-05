package org.jhipster.health.web.rest;

import com.codahale.metrics.annotation.Timed;
import java.net.URISyntaxException;
import org.jhipster.health.security.AuthoritiesConstants;
import org.jhipster.health.security.SecurityUtils;
import org.jhipster.health.service.ElasticsearchIndexService;
import org.jhipster.health.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing Elasticsearch index.
 */
@RestController
@RequestMapping("/api")
public class ElasticsearchIndexResource {

  private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexResource.class);

  private final ElasticsearchIndexService elasticsearchIndexService;

  public ElasticsearchIndexResource(ElasticsearchIndexService elasticsearchIndexService) {
    this.elasticsearchIndexService = elasticsearchIndexService;
  }

  /**
   * POST  /elasticsearch/index -> Reindex all Elasticsearch documents
   */
  @PostMapping("/elasticsearch/index")
  @Timed
  @Secured(AuthoritiesConstants.ADMIN)
  public ResponseEntity<Void> reindexAll() throws URISyntaxException {
    log.info("REST request to reindex Elasticsearch by user : {}", SecurityUtils.getCurrentUserLogin());
    elasticsearchIndexService.reindexAll();
    return ResponseEntity.accepted().headers(HeaderUtil.createAlert("elasticsearch.reindex.accepted", null)).build();
  }
}
