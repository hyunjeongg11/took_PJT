package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.took.shop_api.dto.UpdateShipRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shipSeq;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "shop_seq", nullable = false)
    private Shop shop;

    @Column(nullable = false)
    private String courier; // 택배사 이름

    @Column(nullable = false)
    private String invoiceNum; // 송장 번호

    public void update(UpdateShipRequest request){
        this.courier = request.getCourier();
        this.invoiceNum = request.getInvoiceNum();
    }
}
