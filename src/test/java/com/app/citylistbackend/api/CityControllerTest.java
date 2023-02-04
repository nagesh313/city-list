package com.app.citylistbackend.api;

import com.app.citylistbackend.repository.CityRepository;
import com.app.citylistbackend.repository.entity.City;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CityControllerTest {

    @Mock
    private CityRepository mockCityRepository;
    private CityController cityControllerUnderTest;

    @BeforeEach
    void setUp() {
        cityControllerUnderTest = new CityController(mockCityRepository);
    }

    @Test
    void testListCities() {
        // Setup
        final City city = getCity();
        final Page<City> cities = new PageImpl<>(List.of(city));
        when(mockCityRepository.findAll(any(Pageable.class))).thenReturn(cities);
        // Run the test
        final Page<City> result = cityControllerUnderTest.listCities(0, 1);
        // Verify the results
        Assertions.assertEquals(result.getContent().get(0), city);

    }

    private City getCity() {
        final City city = new City();
        city.setId(0L);
        city.setName("name");
        city.setPhoto("photo");
        return city;
    }
}
