package com.housing.back.service.implement;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.account.AccountBalanceRequestDto;
import com.housing.back.dto.request.account.AccountLinkRequestDto;
import com.housing.back.dto.request.account.AccountListRequestDto;
import com.housing.back.dto.request.account.ChangeMainRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.account.AccountBalanceResponseDto;
import com.housing.back.dto.response.account.AccountLinkResponseDto;
import com.housing.back.dto.response.account.AccountListResponsetDto;
import com.housing.back.dto.response.account.ChangeMainResponseDto;
import com.housing.back.entity.AccountEntity;
import com.housing.back.entity.BankEntity;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.AccountRepository;
import com.housing.back.repository.UserRepository;
import com.housing.back.repository.custom.AccountRepositoryCustom;
import com.housing.back.repository.custom.BankRepositoryCustom;
import com.housing.back.service.AccountService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final UserRepository userRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final AccountRepository accountRepository;
    private final AccountRepositoryCustom accountRepositoryCustom;

    @Override
    public ResponseEntity<? super AccountLinkResponseDto> saveAccount(AccountLinkRequestDto dto) {

        try{

            // 계좌 인증용
            String accountNum = dto.getAccountNum();
            String accountPwd = dto.getAccountPwd();

            // 계좌 인증 완료
            BankEntity bank = bankRepositoryCustom.isMatched(accountNum,accountPwd);

            if(bank!=null){

                // 정보 저장
                String accountName = dto.getAccountName();
                UserEntity user = userRepository.getReferenceById(dto.getUserSeq());
                Boolean main = dto.getMain();

                AccountEntity account = new AccountEntity(accountName,main,user,bank);

                if(accountName==null){
                    accountName = bank.getBankName()+" 계좌";
                }

                if(dto.getMain()==true) accountRepositoryCustom.isMain(dto.getUserSeq());

                accountRepository.save(account);


            }else{
                return AccountLinkResponseDto.notFound();
            }
            

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return AccountLinkResponseDto.success();
    }


    @Override
    @Transactional
    public ResponseEntity<? super ChangeMainResponseDto> changeMain(ChangeMainRequestDto dto) {
        
        try{
            accountRepositoryCustom.changeMain(dto.getUserSeq(),dto.getAccountSeq());
        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ChangeMainResponseDto.success();
    }


    @Override
    public ResponseEntity<? super AccountListResponsetDto> accountList(AccountListRequestDto dto) {

        List<AccountEntity> list = null;
        
        try{
            list = accountRepositoryCustom.findAccountsByUserSeq(dto.getUserSeq());


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return AccountListResponsetDto.success(list);
    }


    @Override
    public ResponseEntity<? super AccountBalanceResponseDto> balance(AccountBalanceRequestDto dto) {
        
        Long bankSeq = null;
        Long balance = null;

        try{

            bankSeq = accountRepositoryCustom.findBankSeqByAccountSeq(dto.getAccountSeq());
            balance = bankRepositoryCustom.findBalanceByBankSeq(bankSeq);

        }catch(Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }

        return AccountBalanceResponseDto.success(balance);

    }
}
