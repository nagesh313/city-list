package com.app.citylistbackend.api;

import com.app.citylistbackend.repository.CityRepository;
import com.app.citylistbackend.repository.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.app.citylistbackend.constant.ValidationConstants.PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0;
import static com.app.citylistbackend.constant.ValidationConstants.PAGE_SIZE_MUST_BE_GREATER_THAN_0;

@Validated
@RestController
@RequestMapping("/api/v1/city")
public class CityController {
    private final CityRepository cityRepository;

    @Autowired
    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }


    @GetMapping("/list")
    public Page<City> listCities(@RequestParam(defaultValue = "0") @PositiveOrZero(message = PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0) int page,
                                 @RequestParam(defaultValue = "10") @Positive(message = PAGE_SIZE_MUST_BE_GREATER_THAN_0) int pageSize) {
        return cityRepository.findAll(Pageable.ofSize(pageSize).withPage(page));
    }

    @GetMapping("/search")
    public Page<City> searchCities(
            @RequestParam String searchString,
            @RequestParam(defaultValue = "0") @PositiveOrZero(message = PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0) int page,
            @RequestParam(defaultValue = "10") @Positive(message = PAGE_SIZE_MUST_BE_GREATER_THAN_0) int pageSize) {
        return cityRepository.findByNameIgnoreCaseLike("%" + searchString + "%", Pageable.ofSize(pageSize).withPage(page));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editCity(@RequestBody City city) {
        Optional<City> optionalCity = cityRepository.findById(city.getId());
        if (optionalCity.isPresent()) {
            City cityObject = optionalCity.get();
            cityObject.setName(city.getName());
            cityObject.setPhoto(city.getPhoto());
            cityRepository.save(city);
            return ResponseEntity.ok().body(cityObject);
        } else {
            return ResponseEntity.badRequest().body("Bad CityId");
        }
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map> constraintViolationException(ConstraintViolationException ex, WebRequest request) {
        Map<String, List<String>> result = new HashMap<>();
        result.put("errors", ex.getConstraintViolations().stream().map(res -> res.getMessage()).collect(Collectors.toList()));
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
