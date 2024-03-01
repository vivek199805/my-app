import { StatementPayoutComponent } from './pages/statement/statement-payout/statement-payout.component';
import { MobikwikCheckoutWalletComponent } from './pages/wallet/mobikwik-checkout-wallet/mobikwik-checkout-wallet.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BbpsDashboardComponent } from './pages/bbps/bbps-dashboard/bbps-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckMobileComponent as DmtCheckMobileComponent } from './pages/dmt/check-mobile/check-mobile.component';
import { DmtdashoardComponent } from './pages/dmt/dmtdashoard/dmtdashoard.component';
import { DmthandlerComponent } from './pages/dmt/dmthandler/dmthandler.component';
import { RegistrationComponent } from './pages/dmt/registration/registration.component';
import { TransactionConfirmComponent } from './pages/dmt/transaction-confirm/transaction-confirm.component';
import { AepshandlerComponent } from './pages/aeps/aepshandler/aepshandler.component';
import { CashWithdrawlComponent } from './pages/aeps/cash-withdrawl/cash-withdrawl.component';
import { BalanceEnquiryComponent } from './pages/aeps/balance-enquiry/balance-enquiry.component';
import { MiniStatementComponent } from './pages/aeps/mini-statement/mini-statement.component';
import { AadhaarPayComponent } from './pages/aeps/aadhaar-pay/aadhaar-pay.component';
import { ScannerSettingComponent } from './pages/aeps/scanner-setting/scanner-setting.component';
import { BbpshandlerComponent } from './pages/bbps/bbpshandler/bbpshandler.component';
import { BbpsPartnerComponent } from './pages/bbps/bbps-partner/bbps-partner.component';
import { PaymentStatusComponent } from './pages/bbps/payment-status/payment-status.component';
import { LicComponent } from './pages/bbps/lic/lic.component';
import { StatementHandlerComponent } from './pages/statement/statement-handler/statement-handler.component';
import { StatementDmtComponent } from './pages/statement/statement-dmt/statement-dmt.component';
import { StatementRechargeComponent } from './pages/statement/statement-recharge/statement-recharge.component';
import { StatementBillPaymentComponent } from './pages/statement/statement-bill-payment/statement-bill-payment.component';
import { StatementWalletComponent } from './pages/statement/statement-wallet/statement-wallet.component';
import { CheckWalletComponent } from './pages/wallet/check-wallet/check-wallet.component';
import { CheckoutWalletComponent } from './pages/wallet/checkout-wallet/checkout-wallet.component';
import { RechargeHandlerComponent } from './pages/recharge/recharge-handler/recharge-handler.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { AccountCreateHandlerComponent } from './pages/create/account-create-handler/account-create-handler.component';
import { CreateAdminComponent } from './pages/create/admin/create-admin/create-admin.component';
import { ListAdminComponent } from './pages/create/admin/list-admin/list-admin.component';
import { CreatePartnerComponent } from './pages/create/partner/create-partner/create-partner.component';
import { ListPartnerComponent } from './pages/create/partner/list-partner/list-partner.component';
import { CreateDistributorComponent } from './pages/create/distributor/create-distributor/create-distributor.component';
import { ListDistributorComponent } from './pages/create/distributor/list-distributor/list-distributor.component';
import { FundHandlerComponent } from './pages/fund/fund-handler/fund-handler.component';
import { FundRequestListingComponent } from './pages/fund/fund-request-listing/fund-request-listing.component';
import { CreateFundRequestComponent } from './pages/fund/create-fund-request/create-fund-request.component';
import { FundTransferToRetailerComponent } from './pages/fund/fund-transfer-to-retailer/fund-transfer-to-retailer.component';
import { FundAdminListingComponent } from './pages/fund/fund-admin-listing/fund-admin-listing.component';
import { FundAdminCreateComponent } from './pages/fund/fund-admin-create/fund-admin-create.component';
import { FundAdminApproveComponent } from './pages/fund/fund-admin-approve/fund-admin-approve.component';
import { AddCompanyBankComponent } from './pages/funds/company-bank/add-company-bank/add-company-bank.component';
import { ListCompanyBankComponent } from './pages/funds/company-bank/list-company-bank/list-company-bank.component';
import { CreateRetailerComponent } from './pages/create/retailer/create-retailer/create-retailer.component';
import { ListRetailerComponent } from './pages/create/retailer/list-retailer/list-retailer.component';
import { PermissionsComponent } from './pages/create/users-permissions/permissions/permissions.component';
import { CreateAsmComponent } from './pages/create/asm/create-asm/create-asm.component';
import { ListAsmComponent } from './pages/create/asm/list-asm/list-asm.component';
import { CreateSupdistributorComponent } from './pages/create/super-distributor/create-supdistributor/create-supdistributor.component';
import { ListSupdistributorComponent } from './pages/create/super-distributor/list-supdistributor/list-supdistributor.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PgRecepitComponent } from './pages/pg-recepit/pg-recepit.component';
import { StatementMatmComponent } from './pages/statement/statement-matm/statement-matm.component';
import { StatementAepsComponent } from './pages/statement/statement-aeps/statement-aeps.component';
import { StatementPgComponent } from './pages/statement/statement-pg/statement-pg.component';
import { StatementAadharpayComponent } from './pages/statement/statement-aadharpay/statement-aadharpay.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { CashdepositHandlerComponent } from './pages/cash-deposit/cashdeposit-handler/cashdeposit-handler.component';
import { SendOtpComponent } from './pages/cash-deposit/send-otp/send-otp.component';
import { TransactionComponent } from './pages/cash-deposit/transaction/transaction.component';
import { FundTransferComponent } from './pages/funds/fund-transfer/fund-transfer.component';
import { ServiceControlComponent } from './pages/super-admin/service-control/service-control.component';
import { FundTransferListComponent } from './pages/funds/fund-transfer-list/fund-transfer-list.component';
import { NotificationhandlerComponent } from './pages/super-admin/notification/notificationhandler/notificationhandler.component';
import { AddNotificationComponent } from './pages/super-admin/notification/add-notification/add-notification.component';
import { ListNotificationComponent } from './pages/super-admin/notification/list-notification/list-notification.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { AepsComponent } from './pages/commission/aeps/aeps.component';
import { DmtComponent } from './pages/commission/dmt/dmt.component';
import { MatmComponent } from './pages/commission/matm/matm.component';
import { RechargeComponent } from './pages/commission/recharge/recharge.component';
import { PgComponent } from './pages/commission/pg/pg.component';
import { AddcomplaintComponent } from './pages/complaint/addcomplaint/addcomplaint.component';
import { ListcomplaintComponent } from './pages/complaint/listcomplaint/listcomplaint.component';
import { ComplainthandlerComponent } from './pages/complaint/complainthandler/complainthandler.component';
import { CheckTxnStatusComponent } from './pages/dmt/check-txn-status/check-txn-status.component';
import { RefundComponent } from './pages/dmt/refund/refund.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { ListAccountComponent } from './pages/payout/list-account/list-account.component';
import { AddAccountComponent } from './pages/payout/add-account/add-account.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RefundCancellationPolicyComponent } from './pages/refund-cancellation-policy/refund-cancellation-policy.component';
import { TermConditionComponent } from './pages/term-condition/term-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { StatusEnquiryComponent } from './pages/payout/status-enquiry/status-enquiry.component';
import { AddRateComponent } from './pages/super-admin/add-rate/add-rate.component';
import { TransactionsComponent } from './pages/dmt/transactions/transactions.component';
import { ListComplaintComponent } from './pages/super-admin/trackcomplaint/list-complaint/list-complaint.component';
import { ComplaintChatComponent } from './pages/complaint/complaint-chat/complaint-chat.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { IdPurchaseComponent } from './pages/purchase/id-purchase/id-purchase.component';
import { PurchaseHistoryComponent } from './pages/purchase/purchase-history/purchase-history.component';
import { IdTransferComponent } from './pages/purchase/id-transfer/id-transfer.component';
import { SignupFormComponent } from './pages/super-admin/signup-form/signup-form.component';
import { SignupUserListComponent } from './pages/super-admin/signup-user-list/signup-user-list.component';
import { PrintDetailsComponent } from './pages/print-details/print-details.component';
import { MarchantOnboardingComponent } from './pages/marchant/marchant-onboarding/marchant-onboarding.component';
import { MarchantListComponent } from './pages/marchant/marchant-list/marchant-list.component';
import { OthercommComponent } from './pages/commission/othercomm/othercomm.component';
import { BillpaycommComponent } from './pages/commission/othercomm/billpaycomm/billpaycomm.component';
import { CommAadhaarComponent } from './pages/commission/othercomm/comm-aadhaar/comm-aadhaar.component';
import { CommCashdepositComponent } from './pages/commission/othercomm/comm-cashdeposit/comm-cashdeposit.component';
import { CommMiniStatementComponent } from './pages/commission/othercomm/comm-mini-statement/comm-mini-statement.component';
import { CommSettlementComponent } from './pages/commission/othercomm/comm-settlement/comm-settlement.component';
import { MobikcommComponent } from './pages/commission/othercomm/mobikcomm/mobikcomm.component';
import { PaytmcomComponent } from './pages/commission/othercomm/paytmcom/paytmcom.component';
import { CallbackurlComponent } from './pages/callbackurl/callbackurl.component';
import { CreateStaffComponent } from './pages/create/staff/create-staff/create-staff.component';
import { ListStaffComponent } from './pages/create/staff/list-staff/list-staff.component';
import { AddFundComponent } from './pages/super-admin/fund/add-fund/add-fund.component';
import { StatmentDebitLedgerComponent } from './pages/statement/statment-debit-ledger/statment-debit-ledger.component';
import { StatmentCreditLedgerComponent } from './pages/statement/statment-credit-ledger/statment-credit-ledger.component';
import { AepsReceiptComponent } from './pages/aeps-receipt/aeps-receipt.component';
import { FundRequestListAdminComponent } from './pages/fund/fund-request-list-admin/fund-request-list-admin.component';
import { CreditCardBillComponent } from './pages/credit-card/credit-card-bill/credit-card-bill.component';
import { CreditCardHandlerComponent } from './pages/credit-card/credit-card-handler/credit-card-handler.component';
import { CashWithdrawalReceiptComponent } from './pages/aeps-receipt/cash-withdrawal-receipt/cash-withdrawal-receipt.component';
import { BalanceEnquiryReceiptComponent } from './pages/aeps-receipt/balance-enquiry-receipt/balance-enquiry-receipt.component';
import { MiniStatementReceiptComponent } from './pages/aeps-receipt/mini-statement-receipt/mini-statement-receipt.component';
import { AadharPayReceiptComponent } from './pages/aeps-receipt/aadhar-pay-receipt/aadhar-pay-receipt.component';
import { QueryComponent } from './pages/statement/statement-dmt/query/query.component';
import { ProcessComponent } from './pages/statement/statement-dmt/process/process.component';
import { UploadDocumentsComponent } from './pages/kyc/kyc/upload-documents/upload-documents.component';
import { KycUserListComponent } from './pages/kyc/kyc/kyc-user-list/kyc-user-list.component';
import { DebitReceivingComponent } from './pages/admin/debit-receiving/debit-receiving.component';
import { MinistatementTxnComponent } from './pages/aeps/ministatement-txn/ministatement-txn.component';
import { PanComponent } from './pages/pan/pan.component';
import { PanStatementComponent } from './pages/pan/pan-statement/pan-statement.component';
import { StatementCreditComponent } from './pages/statement/statement-credit/statement-credit.component';
import { StatementDebitComponent } from './pages/statement/statement-debit/statement-debit.component';
import { PayoutCommissionComponent } from './pages/commission/payout-commission/payout-commission.component';
import { CommLicBillpayComponent } from './pages/commission/othercomm/comm-lic-billpay/comm-lic-billpay.component';
import { PancommComponent } from './pages/commission/othercomm/pancomm/pancomm.component';
import { PaytmWalletComponent } from './pages/commission/othercomm/paytm-wallet/paytm-wallet.component';
import { CcBillPayComponent } from './pages/commission/othercomm/cc-bill-pay/cc-bill-pay.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MobikwikCheckWalletComponent } from './pages/wallet/mobikwik-check-wallet/mobikwik-check-wallet.component';
import { StatementCcpaymentComponent } from './pages/statement/statement-ccpayment/statement-ccpayment.component';
import { RechargequeryComponent } from './pages/statement/statement-recharge/rechargequery/rechargequery.component';
import { RechargeprocessComponent } from './pages/statement/statement-recharge/rechargeprocess/rechargeprocess.component';
import { StatementFastagComponent } from './pages/statement/statement-fastag/statement-fastag.component';
import { StatementIciciDepositComponent } from './pages/statement/statement-icici-deposit/statement-icici-deposit.component';
import { WalletqueryComponent } from './pages/statement/statement-wallet/walletquery/walletquery.component';
import { CreditCardQueryComponent } from './pages/statement/statement-ccpayment/credit-card-query/credit-card-query.component';
import { PayoutprocessComponent } from './pages/statement/statement-payout/payoutprocess/payoutprocess.component';
import { PayoutqueryComponent } from './pages/statement/statement-payout/payoutquery/payoutquery.component';
import { CommFastagComponent } from './pages/commission/othercomm/comm-fastag/comm-fastag.component';
import { CommIciciDepositComponent } from './pages/commission/othercomm/comm-icici-deposit/comm-icici-deposit.component';
import { CreateTemplateComponent } from './pages/commission/create-template/create-template.component';
import { DMTComponent } from './pages/commission/create-template/dmt/dmt.component';
import { CreateAepsComponent } from './pages/commission/create-template/create-aeps/create-aeps.component';
import { CreateRechargeComponent } from './pages/commission/create-template/create-recharge/create-recharge.component';
import { CreatePayoutComponent } from './pages/commission/create-template/create-payout/create-payout.component';
import { CreateMatmComponent } from './pages/commission/create-template/create-matm/create-matm.component';
import { CreatePaymentGatewayComponent } from './pages/commission/create-template/create-payment-gateway/create-payment-gateway.component';
import { CreateBbpsComponent } from './pages/commission/create-template/create-bbps/create-bbps.component';
import { CreateAadharpeyComponent } from './pages/commission/create-template/create-aadharpey/create-aadharpey.component';
import { CreateLicComponent } from './pages/commission/create-template/create-lic/create-lic.component';
import { CreateMinistatementComponent } from './pages/commission/create-template/create-ministatement/create-ministatement.component';
import { CreatePaytmWalletComponent } from './pages/commission/create-template/create-paytm-wallet/create-paytm-wallet.component';
import { CreateMobikwikWalletComponent } from './pages/commission/create-template/create-mobikwik-wallet/create-mobikwik-wallet.component';
import { CreateFastagComponent } from './pages/commission/create-template/create-fastag/create-fastag.component';
import { CreateCCBILLComponent } from './pages/commission/create-template/create-cc-bill/create-cc-bill.component';
import { CreateICICICWComponent } from './pages/commission/create-template/create-icici-cw/create-icici-cw.component';
import { CreatePanComponent } from './pages/commission/create-template/create-pan/create-pan.component';
import { ListTemplateComponent } from './pages/commission/list-template/list-template.component';
import { DmtListComponent } from './pages/commission/list-template/dmt-list/dmt-list.component';
import { ListAepsComponent } from './pages/commission/list-template/list-aeps/list-aeps.component';
import { ListRechargeComponent } from './pages/commission/list-template/list-recharge/list-recharge.component';
import { ListPayoutComponent } from './pages/commission/list-template/list-payout/list-payout.component';
import { ListMatmComponent } from './pages/commission/list-template/list-matm/list-matm.component';
import { ListPaymentGatewayComponent } from './pages/commission/list-template/list-payment-gateway/list-payment-gateway.component';
import { ListBbpsComponent } from './pages/commission/list-template/list-bbps/list-bbps.component';
import { ListAadharpayComponent } from './pages/commission/list-template/list-aadharpay/list-aadharpay.component';
import { ListLicComponent } from './pages/commission/list-template/list-lic/list-lic.component';
import { ListMinistatementComponent } from './pages/commission/list-template/list-ministatement/list-ministatement.component';
import { ListPaytmWalletComponent } from './pages/commission/list-template/list-paytm-wallet/list-paytm-wallet.component';
import { ListMobikwikWalletComponent } from './pages/commission/list-template/list-mobikwik-wallet/list-mobikwik-wallet.component';
import { ListFastagComponent } from './pages/commission/list-template/list-fastag/list-fastag.component';
import { ListCCBILComponent } from './pages/commission/list-template/list-cc-bil/list-cc-bil.component';
import { ListICICICWComponent } from './pages/commission/list-template/list-icici-cw/list-icici-cw.component';
import { ListPanComponent } from './pages/commission/list-template/list-pan/list-pan.component';
import { EditTemplateComponent } from './pages/commission/edit-template/edit-template.component';
import { EditDmtComponent } from './pages/commission/edit-template/edit-dmt/edit-dmt.component';
import { EditAepsComponent } from './pages/commission/edit-template/edit-aeps/edit-aeps.component';
import { EditRechargeComponent } from './pages/commission/edit-template/edit-recharge/edit-recharge.component';
import { EditPayoutComponent } from './pages/commission/edit-template/edit-payout/edit-payout.component';
import { EditMatmComponent } from './pages/commission/edit-template/edit-matm/edit-matm.component';
import { EditPaymentGatewayComponent } from './pages/commission/edit-template/edit-payment-gateway/edit-payment-gateway.component';
import { EditBBPStemplateComponent } from './pages/commission/edit-template/edit-bbpstemplate/edit-bbpstemplate.component';
import { EditAadharpeyComponent } from './pages/commission/edit-template/edit-aadharpey/edit-aadharpey.component';
import { EditLicComponent } from './pages/commission/edit-template/edit-lic/edit-lic.component';
import { EditMinistatementComponent } from './pages/commission/edit-template/edit-ministatement/edit-ministatement.component';
import { EditPaytmWalletComponent } from './pages/commission/edit-template/edit-paytm-wallet/edit-paytm-wallet.component';
import { EditMobikwikWalletComponent } from './pages/commission/edit-template/edit-mobikwik-wallet/edit-mobikwik-wallet.component';
import { EditFastagComponent } from './pages/commission/edit-template/edit-fastag/edit-fastag.component';
import { EditCCBILComponent } from './pages/commission/edit-template/edit-cc-bil/edit-cc-bil.component';
import { EditICICICWComponent } from './pages/commission/edit-template/edit-icici-cw/edit-icici-cw.component';
import { EditPanComponent } from './pages/commission/edit-template/edit-pan/edit-pan.component';
import { BannerAddComponent } from './pages/banner-add/banner-add.component';
import { BannerShowComponent } from './pages/banner-show/banner-show.component';
import { VerificationBankComponent } from './pages/payout/verification-bank/verification-bank.component';
import { AllUserTreeComponent } from './pages/all-user-tree/all-user-tree.component';
import { RetailerlistOfDistributorComponent } from './retailerlist-of-distributor/retailerlist-of-distributor.component'; 
import { DistributorlistOfSuperdistributorComponent } from './distributorlist-of-superdistributor/distributorlist-of-superdistributor.component';
import { IciciCashDepositeComponent } from './pages/icici-cash-deposite/icici-cash-deposite.component';
import { RetailerCertificateComponent } from './pages/retailer-certificate/retailer-certificate.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ServicesComponent } from './pages/services/services.component';
import { RetailerNotificationComponent } from './pages/retailer-notification/retailer-notification.component';
import { IciciCashdepositeQueryComponent } from './pages/statement/statement-icici-deposit/icici-cashdeposite-query/icici-cashdeposite-query.component';
import { ProductListComponent } from './pages/super-admin/service/product-list/product-list.component';
import { AddProductComponent } from './pages/super-admin/service/add-product/add-product.component';
import { PurchaseDetailsComponent } from './pages/services/purchase-details/purchase-details.component';
import { PuchaselistComponent } from './pages/super-admin/service/puchaselist/puchaselist.component';
import { StatementProductComponent } from './pages/statement/statement-product/statement-product.component';
import { FASTagComponent } from './pages/fastag/fastag.component';
import { CaseFreePgComponent } from './pages/case-free-pg/case-free-pg.component';
import { BbpsqueryComponent } from './pages/statement/statement-bill-payment/bbpsquery/bbpsquery.component';
import { PartnerlistOfSuperdistributorComponent } from './pages/partnerlist-of-superdistributor/partnerlist-of-superdistributor.component';
import { SeeStockComponent } from './pages/services/see-stock/see-stock.component';
import { CashfreePayoutComponent } from './pages/cashfree-payout/cashfree-payout.component';
import { CashfreeListAccountComponent } from './pages/cashfree-payout/cashfree-list-account/cashfree-list-account.component';
import { CashfreeAddAccountComponent } from './pages/cashfree-payout/cashfree-add-account/cashfree-add-account.component';
import { CashfreeStatusEnquiryComponent } from './pages/cashfree-payout/cashfree-status-enquiry/cashfree-status-enquiry.component';
import { CreatePackageComponent } from './pages/services/create-package/create-package.component';
import { UserResolverService } from './service/user-resolver.service';
import { ChangeUserPasswordComponent } from './auth/change-user-password/change-user-password.component';
import { SelfsignupUserComponent } from './pages/selfsignup-user/selfsignup-user.component';
import { StatementAirtelCmsComponent } from './pages/statement/statement-airtel-cms/statement-airtel-cms.component';
import { CommFinoCmsComponent } from './pages/commission/othercomm/comm-fino-cms/comm-fino-cms.component';
import { CreateFinoCmsComponent } from './pages/commission/create-template/create-fino-cms/create-fino-cms.component';
import { ListFinoCmsComponent } from './pages/commission/list-template/list-fino-cms/list-fino-cms.component';
import { EditFinoCmsComponent } from './pages/commission/edit-template/edit-fino-cms/edit-fino-cms.component';
import { StatementFinoCmsComponent } from './pages/statement/statement-fino-cms/statement-fino-cms.component';
import { CommissionEarningComponent } from './pages/commission-earning/commission-earning.component';
import { FundDebitComponent } from './pages/admin/fund-debit/fund-debit.component';
import { FundListingComponent } from './pages/admin/fund-listing/fund-listing.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path:'retailer-certificate',
    component:RetailerCertificateComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'change-user-password',
    component: ChangeUserPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'self-signup-user',
    component: SelfsignupUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commission-earning',
    component: CommissionEarningComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bbps',
    component: BbpshandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BbpsDashboardComponent
      },
      {
        path: 'lic',
        component: LicComponent
      },
      {
        path: 'payment-status/:ref',
        component: PaymentStatusComponent
      },
      {
        path: 'payment-status',
        component: PaymentStatusComponent
      },
      {
        path: ':type',
        component: BbpsPartnerComponent
      },
    ]
  },
  {
    path:'retailer-notification',
    component:RetailerNotificationComponent
  },
  {
    path: 'aeps',
    component: AepshandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cash-withdrawal',
        component: CashWithdrawlComponent
      },
      {
        path: 'balance-enquiry',
        component: BalanceEnquiryComponent
      },
      {
        path: 'mini-statement',
        component: MiniStatementComponent
      },
      {
        path: 'aadhar-pay',
        component: AadhaarPayComponent
      },
      {
        path: 'scanner-setting',
        component: ScannerSettingComponent
      },
      {
        path: 'mini-statement-txn',
        component: MinistatementTxnComponent
      },
      // {
      //   path: 'receipt',
      //   component: ReceiptComponent
      // },
    ]

  },
  {
    path: 'pan',
    component: PanComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'statement',
        component: PanStatementComponent
      },
    ]
  },
  {
    path: 'receipt',
    component: AepsReceiptComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cash-withdrawal',
        component: CashWithdrawalReceiptComponent
      },
      {
        path: 'balance-enquiry',
        component: BalanceEnquiryReceiptComponent
      },
      {
        path: 'mini-statement',
        component: MiniStatementReceiptComponent
      },
      {
        path: 'aadhar-pay',
        component: AadharPayReceiptComponent
      },
    ]
  },
  {
    path: 'cash-deposit',
    component: CashdepositHandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SendOtpComponent
      },
      {
        path: 'transaction',
        component: TransactionComponent
      }
    ]
  },
  {
    path: 'dmt',
    component: DmthandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DmtCheckMobileComponent
      }, {
        path: 'dashboard',
        component: DmtdashoardComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'transaction',
        component: TransactionConfirmComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      }
    ]
  },
  {
    path: 'paytm-wallet',
    component: CheckWalletComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mobikwik-wallet',
    component: MobikwikCheckWalletComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mobikwik-checkout',
    component: MobikwikCheckoutWalletComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'debit-receiving',
    component: DebitReceivingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fund-receiving',
    component: FundDebitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fund-listing',
    component: FundListingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kyc-upload-documents',
    component: UploadDocumentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kyc-user-list',
    component: KycUserListComponent,
    canActivate: [AuthGuard],
    resolve:{act:UserResolverService},
  },
  {
    path: 'checkout-wallet',
    component: CheckoutWalletComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print-details',
    component: PrintDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statement',
    component: StatementHandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'aeps',
        component: StatementAepsComponent
      },
      {
        path: 'dmt',
        component: StatementDmtComponent
      },
      {
        path: 'query/:id',
        component: QueryComponent
      },
      {
        path: 'process/:id',
        component: ProcessComponent
      },
      {
        path: 'recharge',
        component: StatementRechargeComponent
      },
      {
        path: 'rechargequery/:id',
        component: RechargequeryComponent 
      },
      {
        path: 'rechargeprocess/:id',
        component: RechargeprocessComponent
      },
      {
        path: 'fastag-statement',
        component: StatementFastagComponent
      },
      {
        path: 'fino-cms-statement',
        component: StatementFinoCmsComponent
      },
      {
        path: 'icici-deposit-statement',
        component: StatementIciciDepositComponent
      }, 
      {
        path: 'icicidepositquery/:id',
        component: IciciCashdepositeQueryComponent
      }, 
      {
        path: 'bbps',
        component: StatementBillPaymentComponent
      },
      {
        path: 'bbpsquery/:id',
        component:  BbpsqueryComponent 
      },
      {
        path: 'wallet',
        component: StatementWalletComponent
      },
      {
        path: 'walletquery/:id',
        component:  WalletqueryComponent 
      },
      {
        path: 'matm',
        component: StatementMatmComponent
      },
        {
         path: 'pg',
         component: StatementPgComponent
       },  
      {
        path: 'debitledger',
        component: StatmentDebitLedgerComponent
      },
      {
        path: 'creditledger',
        component: StatmentCreditLedgerComponent
      },
      {
        path: 'aadharpay',
        component: StatementAadharpayComponent
      }, 
      {
        path: 'mini-statement-txn',
        component: MinistatementTxnComponent
      },
      {
        path: 'pan',
        component: PanStatementComponent
      },
      {
        path: 'credit',
        component: StatementCreditComponent
      },
      {
        path: 'debit',
        component: StatementDebitComponent
      },
      {
        path: 'payout',
        component: StatementPayoutComponent
      },
      {
        path: 'payoutquery/:id',
        component: PayoutqueryComponent 
      },
      {
        path: 'payoutprocess/:id',
        component: PayoutprocessComponent
      },
      {
        path: 'credit-card',
        component: StatementCcpaymentComponent
      },
      {
        path: 'credit-cardQuery/:id',
        component: CreditCardQueryComponent 
      },
      {
        path: 'product-stmt',
        component: StatementProductComponent
      },
      {
        path: 'airtel-cms',
        component: StatementAirtelCmsComponent
      }
    ]
  },
  {
    path: 'account',
    component: AccountCreateHandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateAdminComponent
          },
          {
            path: 'update/:id',
            component: CreateAdminComponent
          },
          {
            path: 'list',
            component: ListAdminComponent
          },
        ]
      },
      {
        path: 'staff',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateStaffComponent
          }, {
            path: 'update/:id',
            component: CreateStaffComponent
          },
          {
            path: 'list',
            component: ListStaffComponent
          },
        ]
      },
      {
        path: 'partner',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreatePartnerComponent
          }, {
            path: 'update/:id',
            component: CreatePartnerComponent
          },
          {
            path: 'list',
            component: ListPartnerComponent
          },
        ]
      },
      {
        path: 'distributor',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateDistributorComponent
          }, {
            path: 'update/:id',
            component: CreateDistributorComponent
          },
          {
            path: 'list',
            component: ListDistributorComponent
          },
        ]
      },
      {
        path: 'retailer',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateRetailerComponent
          }, {
            path: 'update/:id',
            component: CreateRetailerComponent
          },
          {
            path: 'list',
            component: ListRetailerComponent
          },
        ]
      },
      {
        path: 'super-distributor',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateSupdistributorComponent
          }, {
            path: 'update/:id',
            component: CreateSupdistributorComponent
          },
          {
            path: 'list',
            component: ListSupdistributorComponent
          },
        ]
      },
      {
        path: 'asm',
        component: AccountCreateHandlerComponent,
        children: [
          {
            path: 'create',
            component: CreateAsmComponent
          }, {
            path: 'update/:id',
            component: CreateAsmComponent
          },
          {
            path: 'list',
            component: ListAsmComponent
          },
        ]
      }
    ]
  }, 
  {
    path: 'fund',
    component: FundHandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: FundRequestListingComponent
      },
      {
        path: 'create',
        component: CreateFundRequestComponent
      },
      {
        path: 'transfer',
        component: FundTransferToRetailerComponent
      },
      // {
      //   path: 'distributer',
      //   component: FundHandlerComponent,
      //   children: [ 
      //     {
      //       path: '',
      //       component: FundRequestListingComponent
      //     },
      //     {
      //       path: 'create',
      //       component: CreateFundRequestComponent
      //     },
      //     {
      //       path: 'transfer',
      //       component: FundTransferToRetailerComponent
      //     },
      //   ]
      // },
      {
        path: 'admin',
        component: FundHandlerComponent,
        children: [
          {
            path: '',
            component: FundAdminListingComponent
          },
          {
            path: 'create',
            component: FundAdminCreateComponent
          },
          {
            path: 'approve/:id',
            component: FundAdminApproveComponent
          },
        ]
      },
    ]
  },
  {
    path: 'notification',
    component: NotificationhandlerComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: AddNotificationComponent
      },
      {
        path: 'update/:id',
        component: AddNotificationComponent
      },
      {
        path: '',
        component: ListNotificationComponent
      },
    ]
  },
  {
    path: 'commission',
    component: CommissionComponent,
    canActivate: [AuthGuard],
    resolve:{act:UserResolverService},
    children: [
      {
        path: 'aeps',
        component: AepsComponent
      },
      {
        path: 'dmt',
        component: DmtComponent
      },
      {
        path: 'payout',
        component: PayoutCommissionComponent
      },
      {
        path: 'matm',
        component: MatmComponent
      },
      {
        path: 'recharge',
        component: RechargeComponent
      },
        {
        path: 'pg',
        component: PgComponent
      },  
      {
        path: 'othercomm',
        component: OthercommComponent,
        children: [
          {
            path: 'mobikcomm',
            component: MobikcommComponent
          },
          {
            path: '',
            component: BillpaycommComponent
          },
          {
            path: 'billpaycomm',
            component: BillpaycommComponent
          },
          {
            path: 'aadhaar',
            component: CommAadhaarComponent
          },
          {
            path: 'fino-cms',
            component: CommFinoCmsComponent
          },
          {
            path: 'cashdeposit',
            component: CommCashdepositComponent
          },
          {
            path: 'ministatement',
            component: CommMiniStatementComponent
          },
          {
            path: 'lic-billpay',
            component: CommLicBillpayComponent
          },
          {
            path: 'settlement',
            component: CommSettlementComponent
          },
          {
            path: 'pan',
            component: PancommComponent,
          },
          {
            path: 'paytmwallet',
            component: PaytmWalletComponent,
          },
          {
            path: 'mobilmwallet',
            component: MobikcommComponent,
          },
          {
            path: 'ccBillPay',
            component: CcBillPayComponent
          },
          {
            path: 'comm-fastag',
            component: CommFastagComponent
          },
          {
            path: 'icici-comm',
            component: CommIciciDepositComponent
          },
          // {
          //   path: 'airtel-cms-comm',
          //   component: CommAirtelCmsComponent
          // }
        ]
      },
      {
        path: 'create-template',
        component: CreateTemplateComponent,
        children: [
          {
            path: 'dmt',
            component: DMTComponent
          },
          {
            path: 'create-aeps',
            component: CreateAepsComponent
          },
          {
            path: 'create-recharge',
            component: CreateRechargeComponent
          },
          {
            path: 'create-payout',
            component: CreatePayoutComponent
          },
          {
            path: 'create-matm',
            component: CreateMatmComponent
          },
          {
            path: 'create-paymentgateway',
            component: CreatePaymentGatewayComponent
          },
          {
            path: 'create-bbps',
            component: CreateBbpsComponent
          }, {
            path: 'create-aadharpay',
            component: CreateAadharpeyComponent
          },
          {
            path: 'create-fino-cms',
            component: CreateFinoCmsComponent
          },
          {
            path: 'create-lic',
            component: CreateLicComponent
          },
          {
            path: 'create-ministatement',
            component: CreateMinistatementComponent
          },
          {
            path: 'create-paytm',
            component: CreatePaytmWalletComponent
          },
          {
            path: 'create-mobikwik',
            component: CreateMobikwikWalletComponent
          },
          {
            path: 'create-fastag',
            component: CreateFastagComponent
          },
          {
            path: 'create-cc-bill',
            component: CreateCCBILLComponent
          },
          {
            path: 'create-icici-cw',
            component: CreateICICICWComponent
          },
          {
            path: 'create-pan',
            component: CreatePanComponent
          },
        ]
      },
      {
        path: 'list-template',
        component: ListTemplateComponent,
        children: [
          {
            path: 'dmt-list',
            component: DmtListComponent
          },
          {
            path: 'aeps-list',
            component: ListAepsComponent
          },
          {
            path: 'recharge-list',
            component: ListRechargeComponent
          },
          {
            path: 'payout-list',
            component: ListPayoutComponent
          },
          {
            path: 'matm-list',
            component: ListMatmComponent
          },
          {
            path: 'list-payment-gateway',
            component: ListPaymentGatewayComponent
          },
          {
            path: 'list-bbps',
            component: ListBbpsComponent
          },
          {
            path: 'list-aadharpay',
            component: ListAadharpayComponent
          },
          {
            path: 'list-fino-cms',
            component: ListFinoCmsComponent
          },
          {
            path: 'list-lic',
            component: ListLicComponent
          },
          {
            path: 'list-ministatement',
            component: ListMinistatementComponent
          },
          {
            path: 'list-paytm',
            component: ListPaytmWalletComponent
          },
          {
            path: 'list-mobikwik',
            component: ListMobikwikWalletComponent
          },
          {
            path: 'list-fastag',
            component: ListFastagComponent
          },
          {
            path: 'list-cc-bill',
            component: ListCCBILComponent
          },
          {
            path: 'list-icici-cw',
            component: ListICICICWComponent
          },
          {
            path: 'list-pan',
            component: ListPanComponent
          }



        ]
      },
      {
        path: 'Edit-template',
        component: EditTemplateComponent,
        children: [
          {
            path: 'dmt-edit/:id',
            component: EditDmtComponent
          },
          {
            path: 'aeps-edit/:id',
            component: EditAepsComponent
          },
          {
            path: 'recharge-edit/:id',
            component: EditRechargeComponent
          },
          {
            path: 'payout-edit/:id',
            component: EditPayoutComponent
          }, {
            path: 'matm-edit/:id',
            component: EditMatmComponent
          },
          {
            path: 'paymentgateway-edit/:id',
            component: EditPaymentGatewayComponent
          },
          {
            path: 'bbps-edit/:id',
            component: EditBBPStemplateComponent
          },
          {
            path: 'aadharpay-edit/:id',
            component: EditAadharpeyComponent
          },
          {
            path: 'fino-cms-edit/:id',
            component: EditFinoCmsComponent
          },
          {
            path: 'editlic/:id',
            component: EditLicComponent
          },
          {
            path: 'ministatement/:id',
            component: EditMinistatementComponent
          },
          {
            path: 'paytm/:id',
            component: EditPaytmWalletComponent
          },
          {
            path: 'mobikwik/:id',
            component: EditMobikwikWalletComponent
          },
          {
            path: 'fastag/:id',
            component: EditFastagComponent
          },

          {
            path: 'cc-bill/:id',
            component: EditCCBILComponent
          },

          {
            path: 'icici-cw/:id',
            component: EditICICICWComponent
          }
          ,

          {
            path: 'pan/:id',
            component: EditPanComponent
          }


 

        ]
      },
    ]
  },
  // {
  //   path: 'payout',
  //   component: PayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: ListAccountComponent
  //     },
  //     {
  //       path: 'create',
  //       component: AddAccountComponent
  //     },
  //     {
  //       path: 'status-enquiry',
  //       component: StatusEnquiryComponent
  //     },
  //   ]
  // },
  {
    path: 'razorpay-payout',
    component: CashfreePayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CashfreeListAccountComponent
      },
      {
        path: 'razorpay-create',
        component: CashfreeAddAccountComponent
      },
      {
        path: 'razorpay-status-enquiry',
        component: CashfreeStatusEnquiryComponent
      },
    ]
  },
  {
    path: 'marchant-onboarding',
    component: MarchantOnboardingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'marchant-list',
    component: MarchantListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'recharge',
    component: RechargeHandlerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-gateway',
    component: PaymentGatewayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-company-bank',
    component: AddCompanyBankComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-company-bank/:id',
    component: AddCompanyBankComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-company-bank',
    component: ListCompanyBankComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'fund-transfer',
    component: FundTransferComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'fund-transfer-history',
    component: FundTransferListComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'control',
    component: ServiceControlComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'user-permission',
    component: PermissionsComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'add-rate',
    component: AddRateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Fund-request-list',
    component: FundRequestListAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'redirect',
    component: RedirectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pg-recepit',
    component: PgRecepitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'complaint',
    component: ComplainthandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListcomplaintComponent
      },
      {
        path: 'add',
        component: AddcomplaintComponent
      },
      {
        path: 'complaint-chat/:id',
        component: ComplaintChatComponent,
      },
    ]
  },
  {
    path: 'credit-card',
    component: CreditCardHandlerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bill',
        component: CreditCardBillComponent
      },
      // {
      //   path: 'add',
      //   component: AddcomplaintComponent
      // },
      // {
      //   path: 'complaint-chat/:id',
      //   component: ComplaintChatComponent,
      // },
    ]
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'purchaseid',
        component: IdPurchaseComponent
      },
      {
        path: 'purchase-history',
        component: PurchaseHistoryComponent
      },
      {
        path: 'id-transfer',
        component: IdTransferComponent
      }
    ]
  },
  {
    path: 'add-fund',
    component: AddFundComponent,
    resolve:{act:UserResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: 'complaints',
    component: ListComplaintComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'refund',
    component: RefundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup-user-list',
    component: SignupUserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'onboarding-redirect',
    component: CallbackurlComponent
  },
  // {
  //   path: 'signup',
  //   component: SignupFormComponent
  // },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'privacy-policy',
    component: PolicyComponent
  },
  {
    path: 'refund-cancellation-policy',
    component: RefundCancellationPolicyComponent
  },
  {
    path: 'term-condition',
    component: TermConditionComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'add-banner',
    component: BannerAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'show-banner',
    component: BannerShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Verify-pg-account',
    resolve:{act:UserResolverService},
    component: VerificationBankComponent,
  },
  {
    path: 'user-tree',
    component: AllUserTreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'retilerlist/:id',
    component: RetailerlistOfDistributorComponent,
  },
  {
    path: 'Distributorlist/:id',
    component: DistributorlistOfSuperdistributorComponent,
  },
  {
    path: 'Partnerlist/:id',
    component: PartnerlistOfSuperdistributorComponent,
  }, 
  {
    path: 'fasttag',
    component: FASTagComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'icici-cash',
    component: IciciCashDepositeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'certificate',
    component: CertificateComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'purchase-details',
    component: PurchaseDetailsComponent
  },
  {
    path: 'add-product',
    resolve:{act:UserResolverService},
    component: AddProductComponent
  },
  {
    path: 'update-product/:id',
    component: AddProductComponent
  },

  {
    path: 'product-list',
    resolve:{act:UserResolverService},
    component: ProductListComponent
  }, 
  {
    path: 'create-package',
    resolve:{act:UserResolverService},
    component:CreatePackageComponent
  }, 
  {
    path: 'stocks',
    component: SeeStockComponent
  },
  {
    path: 'cash-free',
    component: CaseFreePgComponent
  }, 
  {
    path: 'purchase-request',
    component: PuchaselistComponent
  }, 
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
