package com.took.user_api.dto.request.party;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MakePartyRequestDto {

    @Schema(description = "사용자 시퀀스 (예: 1)", example = "1", required = true)
    private Long userSeq;

    @Schema(description = "파티 제목 (예: '친구들과의 모임')", example = "친구들과의 모임", required = true)
    private String title;

    @Schema(description = "카테고리 (예: 1 - 식사, 2 - 여행 등)", example = "1", required = true)
    private int category;

    @Schema(description = "총 비용 (예: 100000)", example = "100000", required = true)
    private Long cost;

    @Schema(description = "총 인원 수 (예: 10)", example = "10", required = true)
    private int totalMember;

    @Schema(description = "수령 여부 (예: true - 수령, false - 미수령)", example = "false")
    private boolean reciever;
}
