package com.app.citylistbackend.integration;

import com.app.citylistbackend.repository.entity.City;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static com.app.citylistbackend.constant.ValidationConstants.PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0;
import static com.app.citylistbackend.constant.ValidationConstants.PAGE_SIZE_MUST_BE_GREATER_THAN_0;
import static com.app.citylistbackend.util.TestUtil.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class CityControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testListCities_CityRepositoryReturnsItems() throws Exception {
        ResultActions response = mockAndReturnResultActions(0, 1);
        validateMatcher(response, MockMvcResultMatchers.status().isOk());
        response.andExpect(jsonPath("$.content", Matchers.hasSize(1)));
        response.andExpect(jsonPath("$.content[0].id", Matchers.notNullValue()));
        response.andExpect(jsonPath("$.content[0].name", Matchers.notNullValue()));
        response.andExpect(jsonPath("$.content[0].photo", Matchers.notNullValue()));

    }

    @Test
    void testNegativeAndZeroValuesForPageAndPageSize() throws Exception {
        ResultActions response = mockAndReturnResultActions(-1, -1);

        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);
        validateConstraint(response, PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0);

        response = mockAndReturnResultActions(-1, 1);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_MUST_BE_EQUAL_OR_GREATER_THAN_0);

        response = mockAndReturnResultActions(1, -1);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(0, 0);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(1, 0);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);
    }

    @Test
    void testSearchCities_CityRepositoryReturnsItems() throws Exception {
        ResultActions response = mockAndReturnResultActionsForSearch("eijin", 0, 100);
        validateMatcher(response, MockMvcResultMatchers.status().isOk());
        response.andExpect(jsonPath("$.content", Matchers.notNullValue()));
        response.andExpectAll(jsonPath("$.content[*].name").value(
                Matchers.containsInAnyOrder("Beijing")
        ));

    }

    @Test
    void testEditCity() throws Exception {

        City tokyo = getCity(1L, "Edited Tokyo", "Edited Photo");

        ResultActions response = mockAndReturnResultActionsForEdit(tokyo);
        validateMatcher(response, MockMvcResultMatchers.status().isOk());

        response = mockAndReturnResultActionsForSearch("Edited Tokyo", 0, 1);
        response.andExpect(jsonPath("$.content[0].id", Matchers.equalTo(1)));
        response.andExpect(jsonPath("$.content[0].name", Matchers.equalTo(tokyo.getName())));
    }

    @Test
    void testEditCity_CityRepositoryFindByIdReturnsAbsent() throws Exception {

        City tokyo = getCity(-1L, "Tokyo", "Photo");

        ResultActions response = mockAndReturnResultActionsForEdit(tokyo);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        response.andExpect(jsonPath("$", Matchers.equalTo("Bad CityId")));
    }

    private ResultActions mockAndReturnResultActionsForEdit(City editCity) throws Exception {
        return mockMvc.perform(put("/api/v1/city/edit")
                .content(new ObjectMapper().writeValueAsString(editCity))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));
    }

    private ResultActions mockAndReturnResultActionsForSearch(String searchString, int page, int pageSize) throws Exception {
        return mockMvc.perform(get("/api/v1/city/search")
                .param("searchString", searchString)
                .param("page", String.valueOf(page))
                .param("pageSize", String.valueOf(pageSize))
                .accept(MediaType.APPLICATION_JSON));
    }

    private ResultActions mockAndReturnResultActions(int page, int pageSize) throws Exception {
        return mockMvc.perform(get("/api/v1/city/list")
                .param("page", String.valueOf(page))
                .param("pageSize", String.valueOf(pageSize))
                .accept(MediaType.APPLICATION_JSON));
    }

}
