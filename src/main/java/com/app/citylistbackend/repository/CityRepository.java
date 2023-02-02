package com.app.citylistbackend.repository;

import com.app.citylistbackend.repository.entity.City;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends PagingAndSortingRepository<City, Long> {
}
