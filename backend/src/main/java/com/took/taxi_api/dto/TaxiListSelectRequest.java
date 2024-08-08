package com.took.taxi_api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "택시 목록 조회 요청 데이터")
public class TaxiListSelectRequest {

    @Schema(description = "사용자 식별 번호 목록", example = "[1, 2, 3]")
    private List<Long> userSeqs;
}
