package com.took.user_api.dto.request.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class MemberSaveRequestDto {

    @Schema(description = "사용자 시퀀스 (예: 1)", example = "1", required = true)
    private Long userSeq;

    @Schema(description = "파티 시퀀스 (예: 100)", example = "100", required = true)
    private Long partySeq;

    @Schema(description = "비용 (예: 50000)", example = "50000", required = true)
    private int cost;

    @Schema(description = "비용 지불 상태 (예: true 또는 false)", example = "true")
    private boolean status;

    @Schema(description = "알림 수신 여부 (예: true 또는 false)", example = "true")
    private boolean receive;

    @Schema(description = "방장 여부 (예: true 또는 false)", example = "false")
    private boolean isLeader;
}
