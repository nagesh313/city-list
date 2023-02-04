package com.app.citylistbackend.integration;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static com.app.citylistbackend.constant.ValidationConstants.PAGE_MUST_BE_GREATER_THAN_0;
import static com.app.citylistbackend.constant.ValidationConstants.PAGE_SIZE_MUST_BE_GREATER_THAN_0;

@SpringBootTest
@AutoConfigureMockMvc
class CityControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testListCities_CityRepositoryReturnsItems() throws Exception {
        ResultActions response = mockAndReturnResultActions(1, 1);
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
        validateConstraint(response, PAGE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(-1, 1);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(1, -1);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(0, 0);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_MUST_BE_GREATER_THAN_0);
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(0, 1);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_MUST_BE_GREATER_THAN_0);

        response = mockAndReturnResultActions(1, 0);
        validateMatcher(response, MockMvcResultMatchers.status().isBadRequest());
        validateConstraint(response, PAGE_SIZE_MUST_BE_GREATER_THAN_0);
    }

    private void validateConstraint(ResultActions response, String constraint) throws Exception {
        validateMatcher(response, jsonPath("$.errors", Matchers.hasItem(constraint)));
    }

    private void validateMatcher(ResultActions response, ResultMatcher matcher) throws Exception {
        response.andExpect(matcher);
    }

    private ResultActions mockAndReturnResultActions(int page, int pageSize) throws Exception {
        return mockMvc.perform(get("/api/v1/city/list")
                .param("page", String.valueOf(page))
                .param("pageSize", String.valueOf(pageSize))
                .accept(MediaType.APPLICATION_JSON));
    }

}
