package com.app.citylistbackend.repository.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "T_CITY")
@Data
public class City {
    @Id
    private Long id;
    @Column
    private String name;
    @Column
    private String photo;
}
