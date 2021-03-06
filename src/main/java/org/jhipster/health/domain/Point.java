package org.jhipster.health.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Point.
 */
@Entity
@Table(name = "point")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "point")
public class Point implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "exercise")
    private Integer exercise;

    @Column(name = "meals")
    private Integer meals;

    @Column(name = "alcohol")
    private Integer alcohol;

    @NotNull
    @Size(max = 140)
    @Column(name = "note", length = 140, nullable = false)
    private String note;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("points")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Point date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getExercise() {
        return exercise;
    }

    public Point exercise(Integer exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Integer exercise) {
        this.exercise = exercise;
    }

    public Integer getMeals() {
        return meals;
    }

    public Point meals(Integer meals) {
        this.meals = meals;
        return this;
    }

    public void setMeals(Integer meals) {
        this.meals = meals;
    }

    public Integer getAlcohol() {
        return alcohol;
    }

    public Point alcohol(Integer alcohol) {
        this.alcohol = alcohol;
        return this;
    }

    public void setAlcohol(Integer alcohol) {
        this.alcohol = alcohol;
    }

    public String getNote() {
        return note;
    }

    public Point note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public Point user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Point)) {
            return false;
        }
        return id != null && id.equals(((Point) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Point{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", exercise=" + getExercise() +
            ", meals=" + getMeals() +
            ", alcohol=" + getAlcohol() +
            ", note='" + getNote() + "'" +
            "}";
    }
}
