package com.app.citylistbackend.api;

import com.app.citylistbackend.repository.CityRepository;
import com.app.citylistbackend.repository.entity.City;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.mockito.Mockito.reset;
import static com.app.citylistbackend.util.TestUtil.getCity;

@ExtendWith(MockitoExtension.class)
class CityControllerTest {

    @Mock
    private CityRepository mockCityRepository;
    private CityController cityControllerUnderTest;

    @BeforeEach
    void setUp() {
        reset(mockCityRepository);
        cityControllerUnderTest = new CityController(mockCityRepository);

    }

    @Test
    void testListCities() {
        
        final City city = getCity(1L, "name", "photo");
        final Page<City> cities = new PageImpl<>(List.of(city));
        when(mockCityRepository.findAll(any(Pageable.class))).thenReturn(cities);
        
        final Page<City> result = cityControllerUnderTest.listCities(0, 1);
        // Verify the results
        Assertions.assertEquals(result.getContent().get(0), city);

    }

    @Test
    void testSearchCity() {
        
        final City city = getCity(1L, "name", "photo");
        final Page<City> cities = new PageImpl<>(List.of(city));
        when(mockCityRepository.findByNameIgnoreCaseLike(any(String.class), any(Pageable.class))).thenReturn(cities);
        
        final Page<City> result = cityControllerUnderTest.searchCities("Test", 0, 1);
        // Verify the results
        Assertions.assertEquals(result.getContent().get(0), city);

    }

    @Test
    void testEditCityWithExistingCityId() {
        
        final City city = getCity(1L, "name", "photo");
        when(mockCityRepository.findById(any(Long.class))).thenReturn(Optional.of(city));
        
        final City editCity = getCity(1L, "editedName", "editedName");
        ArgumentCaptor<City> cityArgumentCaptor = ArgumentCaptor.forClass(City.class);
        ArgumentCaptor<Long> findByIdCityArgument = ArgumentCaptor.forClass(Long.class);
        final ResponseEntity<?> result = cityControllerUnderTest.editCity(editCity);
        // Verify the results
        Assertions.assertEquals(result.getStatusCode(), HttpStatus.OK);

        verify(mockCityRepository).findById(findByIdCityArgument.capture());
        Assertions.assertEquals(findByIdCityArgument.getValue(), editCity.getId());

        verify(mockCityRepository).save(cityArgumentCaptor.capture());
        Assertions.assertEquals(cityArgumentCaptor.getValue().getId(), editCity.getId());
        Assertions.assertEquals(cityArgumentCaptor.getValue().getId(), editCity.getId());
        Assertions.assertEquals(cityArgumentCaptor.getValue().getName(), editCity.getName());
        Assertions.assertEquals(cityArgumentCaptor.getValue().getPhoto(), editCity.getPhoto());
    }

    @Test
    void testEditCityWithNonExistentCityId() {
        
        when(mockCityRepository.findById(2L)).thenReturn(Optional.empty());
        
        final City editCity = getCity(2L, "editedName", "editedName");
        ArgumentCaptor<Long> findByIdCityArgument = ArgumentCaptor.forClass(Long.class);
        final ResponseEntity<?> result = cityControllerUnderTest.editCity(editCity);

        // Verify the results
        Assertions.assertEquals(result.getStatusCode(), HttpStatus.BAD_REQUEST);

        verify(mockCityRepository).findById(findByIdCityArgument.capture());
        Assertions.assertEquals(findByIdCityArgument.getValue(), editCity.getId());

    }
}
