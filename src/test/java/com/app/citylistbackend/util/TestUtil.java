package com.app.citylistbackend.util;

import com.app.citylistbackend.repository.entity.City;
import org.hamcrest.Matchers;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class TestUtil {
    public static City getCity(Long id, String name, String photo) {
        final City city = new City();
        city.setId(id);
        city.setName(name);
        city.setPhoto(photo);
        return city;
    }

    public static void validateConstraint(ResultActions response, String constraint) throws Exception {
        validateMatcher(response, jsonPath("$.errors", Matchers.hasItem(constraint)));
    }

    public static void validateMatcher(ResultActions response, ResultMatcher matcher) throws Exception {
        response.andExpect(matcher);
    }
}
