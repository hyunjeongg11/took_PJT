package com.took.user_api.dto.response.user;

import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;


@Getter
public class DeliNearUserResponseDto extends ResponseDto {

    private List<Long> nearUser;

    private DeliNearUserResponseDto(List<Long> nearUser){
        this.nearUser = nearUser;
    }

    public static ResponseEntity<DeliNearUserResponseDto> success(List<Long> nearUser){
        DeliNearUserResponseDto responseBody = new DeliNearUserResponseDto(nearUser);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


}
