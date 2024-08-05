package com.took.user_api.dto.request.party;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayAllRequestDto {

    @Schema(description = "방장 여부 (true: 방장, false: 비방장)", example = "true", required = true)
    private Boolean isLeader;

    @Schema(description = "사용자 시퀀스 (예: 1)", example = "1", required = true)
    private Long userSeq;

    @Schema(description = "파티 시퀀스 (예: 1)", example = "1", required = true)
    private Long partySeq;
}
