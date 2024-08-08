package com.ssafy.shop_api.entity;

import com.ssafy.shop_api.dto.UpdateShipRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shipSeq;

    @Column(nullable = false)
    private Long shopSeq;

    @Column(nullable = false)
    private String courier; // 택배사 이름

    @Column(nullable = false)
    private String invoiceNum; // 송장 번호

    public void update(UpdateShipRequest request){
        this.courier = request.getCourier();
        this.invoiceNum = request.getInvoiceNum();
    }
}
