package com.housing.back.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.party.PartyRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.party.PartyListResponseDto;
import com.housing.back.dto.response.party.PartyResponseDto;
import com.housing.back.entity.PartyEntity;
import com.housing.back.repository.PartyRepository;
import com.housing.back.service.PartyService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;

    @Override
    @Transactional
    public ResponseEntity<? super PartyResponseDto> makeParty(PartyRequestDto dto) {
        PartyEntity partyEntity = new PartyEntity(dto);

        try {

            partyRepository.save(partyEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PartyResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PartyListResponseDto> listAll() {
        
        List<PartyEntity> list = null;
        try{
         list = partyRepository.findAll();
        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PartyListResponseDto.success(list);
    }
}
