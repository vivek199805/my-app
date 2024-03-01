import { PayoutCommissionComponent } from './pages/commission/payout-commission/payout-commission.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckMobileComponent } from './pages/dmt/check-mobile/check-mobile.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { RegistrationComponent } from './pages/dmt/registration/registration.component';
import { DmtdashoardComponent } from './pages/dmt/dmtdashoard/dmtdashoard.component';
import { DmthandlerComponent } from './pages/dmt/dmthandler/dmthandler.component';
import { TransactionConfirmComponent } from './pages/dmt/transaction-confirm/transaction-confirm.component';
import { BbpsDashboardComponent } from './pages/bbps/bbps-dashboard/bbps-dashboard.component';
import { OtpVerificationDirective } from './directives/otp-verification.directive';
import { CustomModelComponent } from './_helpers/custom-model/custom-model.component';
import { NgSelect2Module } from 'ng-select2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceEnquiryComponent } from './pages/aeps/balance-enquiry/balance-enquiry.component';
import { MiniStatementComponent } from './pages/aeps/mini-statement/mini-statement.component';
import { AadhaarPayComponent } from './pages/aeps/aadhaar-pay/aadhaar-pay.component';
import { ScannerSettingComponent } from './pages/aeps/scanner-setting/scanner-setting.component';
import { CashWithdrawlComponent } from './pages/aeps/cash-withdrawl/cash-withdrawl.component';
import { AepshandlerComponent } from './pages/aeps/aepshandler/aepshandler.component';
import { BbpshandlerComponent } from './pages/bbps/bbpshandler/bbpshandler.component';
import { BbpsPartnerComponent } from './pages/bbps/bbps-partner/bbps-partner.component';
import { PaymentStatusComponent } from './pages/bbps/payment-status/payment-status.component';
import { LicComponent } from './pages/bbps/lic/lic.component';
import { StatementHandlerComponent } from './pages/statement/statement-handler/statement-handler.component';
import { StatementDmtComponent } from './pages/statement/statement-dmt/statement-dmt.component';
import { StatementRechargeComponent } from './pages/statement/statement-recharge/statement-recharge.component';
import { StatementBillPaymentComponent } from './pages/statement/statement-bill-payment/statement-bill-payment.component';
import { StatementWalletComponent } from './pages/statement/statement-wallet/statement-wallet.component';
import { DataTablesModule } from 'angular-datatables';
import { DataTableToolsComponent } from './_helpers/data-table-tools/data-table-tools.component';
import { CheckWalletComponent } from './pages/wallet/check-wallet/check-wallet.component';
import { CheckoutWalletComponent } from './pages/wallet/checkout-wallet/checkout-wallet.component';
import { RechargeHandlerComponent } from './pages/recharge/recharge-handler/recharge-handler.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RetailerComponent } from './sidebar/retailer/retailer.component';
import { AdminComponent } from './sidebar/admin/admin.component';
import { SuperAdminComponent } from './sidebar/super-admin/super-admin.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { RetailerDashboardComponent } from './pages/dashboard/retailer-dashboard/retailer-dashboard.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { SuperadminDashboardComponent } from './pages/dashboard/superadmin-dashboard/superadmin-dashboard.component';
import { AccountCreateHandlerComponent } from './pages/create/account-create-handler/account-create-handler.component';
import { CreateAdminComponent } from './pages/create/admin/create-admin/create-admin.component';
import { ListAdminComponent } from './pages/create/admin/list-admin/list-admin.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CreatePartnerComponent } from './pages/create/partner/create-partner/create-partner.component';
import { ListPartnerComponent } from './pages/create/partner/list-partner/list-partner.component';
import { CreateDistributorComponent } from './pages/create/distributor/create-distributor/create-distributor.component';
import { ListDistributorComponent } from './pages/create/distributor/list-distributor/list-distributor.component';
import { DistributerComponent } from './sidebar/distributer/distributer.component';
import { FundHandlerComponent } from './pages/fund/fund-handler/fund-handler.component';
import { CreateFundRequestComponent } from './pages/fund/create-fund-request/create-fund-request.component';
import { FundRequestListingComponent } from './pages/fund/fund-request-listing/fund-request-listing.component';
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
import { SendOtpComponent } from './pages/cash-deposit/send-otp/send-otp.component';
import { TransactionComponent } from './pages/cash-deposit/transaction/transaction.component';
import { CashdepositHandlerComponent } from './pages/cash-deposit/cashdeposit-handler/cashdeposit-handler.component';
import { FundTransferComponent } from './pages/funds/fund-transfer/fund-transfer.component';
import { ServiceControlComponent } from './pages/super-admin/service-control/service-control.component';
import { FundTransferListComponent } from './pages/funds/fund-transfer-list/fund-transfer-list.component';
import { AddNotificationComponent } from './pages/super-admin/notification/add-notification/add-notification.component';
import { ListNotificationComponent } from './pages/super-admin/notification/list-notification/list-notification.component';
import { NotificationhandlerComponent } from './pages/super-admin/notification/notificationhandler/notificationhandler.component';
import { ListComplaintComponent } from './pages/super-admin/trackcomplaint/list-complaint/list-complaint.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { AepsComponent } from './pages/commission/aeps/aeps.component';
import { DmtComponent } from './pages/commission/dmt/dmt.component';
import { MatmComponent } from './pages/commission/matm/matm.component';
import { RechargeComponent } from './pages/commission/recharge/recharge.component';
import { PgComponent } from './pages/commission/pg/pg.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ListcomplaintComponent } from './pages/complaint/listcomplaint/listcomplaint.component';
import { AddcomplaintComponent } from './pages/complaint/addcomplaint/addcomplaint.component';
import { ComplainthandlerComponent } from './pages/complaint/complainthandler/complainthandler.component';
import { CheckTxnStatusComponent } from './pages/dmt/check-txn-status/check-txn-status.component';
import { RefundComponent } from './pages/dmt/refund/refund.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { ListAccountComponent } from './pages/payout/list-account/list-account.component';
import { AddAccountComponent } from './pages/payout/add-account/add-account.component';
import { StatusEnquiryComponent } from './pages/payout/status-enquiry/status-enquiry.component';
import { RefundCancellationPolicyComponent } from './pages/refund-cancellation-policy/refund-cancellation-policy.component';
import { TermConditionComponent } from './pages/term-condition/term-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TransactionDetailsComponent } from './pages/payout/transaction-details/transaction-details.component';
import { AddRateComponent } from './pages/super-admin/add-rate/add-rate.component';
import { TransactionsComponent } from './pages/dmt/transactions/transactions.component';
import { ComplaintChatComponent } from './pages/complaint/complaint-chat/complaint-chat.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { IdPurchaseComponent } from './pages/purchase/id-purchase/id-purchase.component';
import { PurchaseHistoryComponent } from './pages/purchase/purchase-history/purchase-history.component';
import { IdTransferComponent } from './pages/purchase/id-transfer/id-transfer.component';
import { PartnerDashboardComponent } from './pages/dashboard/partner-dashboard/partner-dashboard.component';
import { SuperDistributorDashboardComponent } from './pages/dashboard/super-distributor-dashboard/super-distributor-dashboard.component';
import { DistributorDashboardComponent } from './pages/dashboard/distributor-dashboard/distributor-dashboard.component';
import { SuperDistributorComponent } from './sidebar/super-distributor/super-distributor.component';
import { PartnerComponent } from './sidebar/partner/partner.component';
import { SignupFormComponent } from './pages/super-admin/signup-form/signup-form.component';
import { SignupUserListComponent } from './pages/super-admin/signup-user-list/signup-user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { PrintDetailsComponent } from './pages/print-details/print-details.component';
import { ModalModule } from 'ngb-modal';
import { MarchantOnboardingComponent } from './pages/marchant/marchant-onboarding/marchant-onboarding.component';
import { MarchantListComponent } from './pages/marchant/marchant-list/marchant-list.component';
import { MarchantDetailsComponent } from './pages/marchant/marchant-details/marchant-details.component';
import { OthercommComponent } from './pages/commission/othercomm/othercomm.component';
import { BillpaycommComponent } from './pages/commission/othercomm/billpaycomm/billpaycomm.component';
import { CommAadhaarComponent } from './pages/commission/othercomm/comm-aadhaar/comm-aadhaar.component';
import { CommCashdepositComponent } from './pages/commission/othercomm/comm-cashdeposit/comm-cashdeposit.component';
import { CommMiniStatementComponent } from './pages/commission/othercomm/comm-mini-statement/comm-mini-statement.component';
import { CommSettlementComponent } from './pages/commission/othercomm/comm-settlement/comm-settlement.component';
import { MobikcommComponent } from './pages/commission/othercomm/mobikcomm/mobikcomm.component';
import { PaytmcomComponent } from './pages/commission/othercomm/paytmcom/paytmcom.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { CallbackurlComponent } from './pages/callbackurl/callbackurl.component';
import { ShowNullResultPipe } from './_helpers/common/custom-pipes/show-null-result.pipe';
import { ReplacePipe } from './_helpers/common/custom-pipes/replace.pipe';
import { CreateStaffComponent } from './pages/create/staff/create-staff/create-staff.component';
import { AddFundComponent } from './pages/super-admin/fund/add-fund/add-fund.component';
import { ListStaffComponent } from './pages/create/staff/list-staff/list-staff.component';
import { StatmentCreditLedgerComponent } from './pages/statement/statment-credit-ledger/statment-credit-ledger.component';
import { StatmentDebitLedgerComponent } from './pages/statement/statment-debit-ledger/statment-debit-ledger.component';
import { FundRequestListAdminComponent } from './pages/fund/fund-request-list-admin/fund-request-list-admin.component';
import { CreditCardBillComponent } from './pages/credit-card/credit-card-bill/credit-card-bill.component';
import { CreditCardHandlerComponent } from './pages/credit-card/credit-card-handler/credit-card-handler.component';
import { AadharPayReceiptComponent } from './pages/aeps-receipt/aadhar-pay-receipt/aadhar-pay-receipt.component';
import { CashWithdrawalReceiptComponent } from './pages/aeps-receipt/cash-withdrawal-receipt/cash-withdrawal-receipt.component';
import { BalanceEnquiryReceiptComponent } from './pages/aeps-receipt/balance-enquiry-receipt/balance-enquiry-receipt.component';
import { MiniStatementReceiptComponent } from './pages/aeps-receipt/mini-statement-receipt/mini-statement-receipt.component';
import { AepsReceiptComponent } from './pages/aeps-receipt/aeps-receipt.component';
import { UploadDocumentsComponent } from './pages/kyc/kyc/upload-documents/upload-documents.component';
import { KycUserListComponent } from './pages/kyc/kyc/kyc-user-list/kyc-user-list.component';
import { QueryComponent } from './pages/statement/statement-dmt/query/query.component';
import { ProcessComponent } from './pages/statement/statement-dmt/process/process.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { GetIndexPipe } from './_helpers/common/custom-pipes/get-index.pipe';
import { SlipPrintComponent } from './_helpers/common/custome-modal/slip-print/slip-print.component';
import { AutocompleteOffDirective } from './directives/autocomplete-off.directive';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DebitReceivingComponent } from './pages/admin/debit-receiving/debit-receiving.component';
import { RiCustomMdlComponent } from './_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.component';
import { MinistatementTxnComponent } from './pages/aeps/ministatement-txn/ministatement-txn.component';
import { PanComponent } from './pages/pan/pan.component';
import { PanStatementComponent } from './pages/pan/pan-statement/pan-statement.component';
import { StatementCreditComponent } from './pages/statement/statement-credit/statement-credit.component';
import { StatementDebitComponent } from './pages/statement/statement-debit/statement-debit.component';
import { ComplaintChatComponent as ComplaintChatComponent2 } from './pages/super-admin/trackcomplaint/complaint-chat/complaint-chat.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommLicBillpayComponent } from './pages/commission/othercomm/comm-lic-billpay/comm-lic-billpay.component';
import { PancommComponent } from './pages/commission/othercomm/pancomm/pancomm.component';
import { PaytmWalletComponent } from './pages/commission/othercomm/paytm-wallet/paytm-wallet.component';
import { CcBillPayComponent } from './pages/commission/othercomm/cc-bill-pay/cc-bill-pay.component';
import { CustomOtpComponent } from './_helpers/common/custom-otp/custom-otp.component';
import { FocusToNextInputDirective } from './_helpers/common/custom-directive/focus-to-next-input.directive';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MobikwikCheckWalletComponent } from './pages/wallet/mobikwik-check-wallet/mobikwik-check-wallet.component';
import { MobikwikCheckoutWalletComponent } from './pages/wallet/mobikwik-checkout-wallet/mobikwik-checkout-wallet.component';
import { StatementPayoutComponent } from './pages/statement/statement-payout/statement-payout.component';
import { StatementCcpaymentComponent } from './pages/statement/statement-ccpayment/statement-ccpayment.component'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RetailerlistOfDistributorComponent } from './retailerlist-of-distributor/retailerlist-of-distributor.component';
import { AllUserTreeComponent } from './pages/all-user-tree/all-user-tree.component';
import { VerificationBankComponent } from './pages/payout/verification-bank/verification-bank.component';
import { DistributorlistOfSuperdistributorComponent } from './distributorlist-of-superdistributor/distributorlist-of-superdistributor.component';
import { BannerShowComponent } from './pages/banner-show/banner-show.component';
import { BannerAddComponent } from './pages/banner-add/banner-add.component';
import { WalletqueryComponent } from './pages/statement/statement-wallet/walletquery/walletquery.component';
import { PayoutqueryComponent } from './pages/statement/statement-payout/payoutquery/payoutquery.component';
import { PayoutprocessComponent } from './pages/statement/statement-payout/payoutprocess/payoutprocess.component';
import { RechargequeryComponent } from './pages/statement/statement-recharge/rechargequery/rechargequery.component';
import { CreateAadharpeyComponent } from './pages/commission/create-template/create-aadharpey/create-aadharpey.component';
import { CreateAepsComponent } from './pages/commission/create-template/create-aeps/create-aeps.component';
import { CreateBbpsComponent } from './pages/commission/create-template/create-bbps/create-bbps.component';
import { CreateCCBILLComponent } from './pages/commission/create-template/create-cc-bill/create-cc-bill.component';
import { CreateFastagComponent } from './pages/commission/create-template/create-fastag/create-fastag.component';
import { CreateICICICWComponent } from './pages/commission/create-template/create-icici-cw/create-icici-cw.component';
import { CreateLicComponent } from './pages/commission/create-template/create-lic/create-lic.component';
import { CreateMatmComponent } from './pages/commission/create-template/create-matm/create-matm.component';
import { CreateMinistatementComponent } from './pages/commission/create-template/create-ministatement/create-ministatement.component';
import { CreateMobikwikWalletComponent } from './pages/commission/create-template/create-mobikwik-wallet/create-mobikwik-wallet.component';
import { CreatePanComponent } from './pages/commission/create-template/create-pan/create-pan.component';
import { CreatePaymentGatewayComponent } from './pages/commission/create-template/create-payment-gateway/create-payment-gateway.component';
import { CreatePayoutComponent } from './pages/commission/create-template/create-payout/create-payout.component';
import { CreatePaytmWalletComponent } from './pages/commission/create-template/create-paytm-wallet/create-paytm-wallet.component';
import { CreateRechargeComponent } from './pages/commission/create-template/create-recharge/create-recharge.component';
import { CreateTemplateComponent } from './pages/commission/create-template/create-template.component';
import { DMTComponent } from './pages/commission/create-template/dmt/dmt.component';
import { EditAadharpeyComponent } from './pages/commission/edit-template/edit-aadharpey/edit-aadharpey.component';
import { EditAepsComponent } from './pages/commission/edit-template/edit-aeps/edit-aeps.component';
import { EditBBPStemplateComponent } from './pages/commission/edit-template/edit-bbpstemplate/edit-bbpstemplate.component';
import { EditCCBILComponent } from './pages/commission/edit-template/edit-cc-bil/edit-cc-bil.component';
import { EditDmtComponent } from './pages/commission/edit-template/edit-dmt/edit-dmt.component';
import { EditFastagComponent } from './pages/commission/edit-template/edit-fastag/edit-fastag.component';
import { EditICICICWComponent } from './pages/commission/edit-template/edit-icici-cw/edit-icici-cw.component';
import { EditLicComponent } from './pages/commission/edit-template/edit-lic/edit-lic.component';
import { EditMatmComponent } from './pages/commission/edit-template/edit-matm/edit-matm.component';
import { EditMinistatementComponent } from './pages/commission/edit-template/edit-ministatement/edit-ministatement.component';
import { EditMobikwikWalletComponent } from './pages/commission/edit-template/edit-mobikwik-wallet/edit-mobikwik-wallet.component';
import { EditPanComponent } from './pages/commission/edit-template/edit-pan/edit-pan.component';
import { EditPaymentGatewayComponent } from './pages/commission/edit-template/edit-payment-gateway/edit-payment-gateway.component';
import { EditPayoutComponent } from './pages/commission/edit-template/edit-payout/edit-payout.component';
import { EditPaytmWalletComponent } from './pages/commission/edit-template/edit-paytm-wallet/edit-paytm-wallet.component';
import { EditRechargeComponent } from './pages/commission/edit-template/edit-recharge/edit-recharge.component';
import { EditTemplateComponent } from './pages/commission/edit-template/edit-template.component';
import { DmtListComponent } from './pages/commission/list-template/dmt-list/dmt-list.component';
import { ListAadharpayComponent } from './pages/commission/list-template/list-aadharpay/list-aadharpay.component';
import { ListAepsComponent } from './pages/commission/list-template/list-aeps/list-aeps.component';
import { ListBbpsComponent } from './pages/commission/list-template/list-bbps/list-bbps.component';
import { ListCCBILComponent } from './pages/commission/list-template/list-cc-bil/list-cc-bil.component';
import { ListFastagComponent } from './pages/commission/list-template/list-fastag/list-fastag.component';
import { ListICICICWComponent } from './pages/commission/list-template/list-icici-cw/list-icici-cw.component';
import { ListLicComponent } from './pages/commission/list-template/list-lic/list-lic.component';
import { ListMatmComponent } from './pages/commission/list-template/list-matm/list-matm.component';
import { ListMinistatementComponent } from './pages/commission/list-template/list-ministatement/list-ministatement.component';
import { ListMobikwikWalletComponent } from './pages/commission/list-template/list-mobikwik-wallet/list-mobikwik-wallet.component';
import { ListPanComponent } from './pages/commission/list-template/list-pan/list-pan.component';
import { ListPaymentGatewayComponent } from './pages/commission/list-template/list-payment-gateway/list-payment-gateway.component';
import { ListPayoutComponent } from './pages/commission/list-template/list-payout/list-payout.component';
import { ListPaytmWalletComponent } from './pages/commission/list-template/list-paytm-wallet/list-paytm-wallet.component';
import { ListRechargeComponent } from './pages/commission/list-template/list-recharge/list-recharge.component';
import { ListTemplateComponent } from './pages/commission/list-template/list-template.component';
import { CommFastagComponent } from './pages/commission/othercomm/comm-fastag/comm-fastag.component';
import { CommIciciDepositComponent } from './pages/commission/othercomm/comm-icici-deposit/comm-icici-deposit.component';
import { CreditCardQueryComponent } from './pages/statement/statement-ccpayment/credit-card-query/credit-card-query.component';
import { StatementFastagComponent } from './pages/statement/statement-fastag/statement-fastag.component';
import { StatementIciciDepositComponent } from './pages/statement/statement-icici-deposit/statement-icici-deposit.component';
import { RechargeprocessComponent } from './pages/statement/statement-recharge/rechargeprocess/rechargeprocess.component';
import { IciciCashDepositeComponent } from './pages/icici-cash-deposite/icici-cash-deposite.component';
import { RetailerCertificateComponent } from './pages/retailer-certificate/retailer-certificate.component';
import { ServicesComponent } from './pages/services/services.component';
import { RetailerNotificationComponent } from './pages/retailer-notification/retailer-notification.component';
import { IciciCashdepositeQueryComponent } from './pages/statement/statement-icici-deposit/icici-cashdeposite-query/icici-cashdeposite-query.component';
import { AddProductComponent } from './pages/super-admin/service/add-product/add-product.component';
import { ProductListComponent } from './pages/super-admin/service/product-list/product-list.component';
import { PuchaselistComponent } from './pages/super-admin/service/puchaselist/puchaselist.component';
import { AsmComponent } from './sidebar/asm/asm.component';
import { PurchaseDetailsComponent } from './pages/services/purchase-details/purchase-details.component';
import { StatementProductComponent } from './pages/statement/statement-product/statement-product.component';
import { FASTagComponent } from './pages/fastag/fastag.component';
import { CaseFreePgComponent } from './pages/case-free-pg/case-free-pg.component';
import { BbpsqueryComponent } from './pages/statement/statement-bill-payment/bbpsquery/bbpsquery.component';
import { PartnerlistOfSuperdistributorComponent } from './pages/partnerlist-of-superdistributor/partnerlist-of-superdistributor.component';
import { SeeStockComponent } from './pages/services/see-stock/see-stock.component';
import { CashfreeAddAccountComponent } from './pages/cashfree-payout/cashfree-add-account/cashfree-add-account.component';
import { CashfreeListAccountComponent } from './pages/cashfree-payout/cashfree-list-account/cashfree-list-account.component';
import { CashfreePayoutComponent } from './pages/cashfree-payout/cashfree-payout.component';
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

@NgModule({
  declarations: [
    CashfreeAddAccountComponent,
    CashfreeListAccountComponent,
    CashfreeStatusEnquiryComponent,
    CashfreePayoutComponent,
    SeeStockComponent,
    FASTagComponent,
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    LoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    AboutUsComponent,
    AddFundComponent,
    CheckMobileComponent,
    RegistrationComponent,
    DmtdashoardComponent,
    DmthandlerComponent,
    TransactionConfirmComponent,
    BbpsDashboardComponent,
    OtpVerificationDirective,
    CustomModelComponent,
    BalanceEnquiryComponent,
    MiniStatementComponent,
    AadhaarPayComponent,
    ScannerSettingComponent,
    CashWithdrawlComponent,
    AepshandlerComponent,
    BbpshandlerComponent,
    BbpsPartnerComponent,
    PaymentStatusComponent,
    LicComponent,
    DataTableToolsComponent,
    StatementHandlerComponent,
    StatementDmtComponent,
    StatementRechargeComponent,
    StatementBillPaymentComponent,
    StatementWalletComponent,
    CheckWalletComponent,
    CheckoutWalletComponent,
    RechargeHandlerComponent,
    PageNotFoundComponent,
    SidebarComponent,
    RetailerComponent,
    AdminComponent,
    SuperAdminComponent,
    PaymentGatewayComponent,
    RetailerDashboardComponent,
    AdminDashboardComponent,
    SuperadminDashboardComponent,
    AccountCreateHandlerComponent,
    CreateAdminComponent,
    ListAdminComponent,
    ListStaffComponent,
    CreateStaffComponent,
    CreatePartnerComponent,
    FundRequestListAdminComponent,
    ListPartnerComponent,
    CreateDistributorComponent,
    ListDistributorComponent,
    DistributerComponent,
    FundHandlerComponent,
    CreateFundRequestComponent,
    FundRequestListingComponent,
    FundTransferToRetailerComponent,
    FundAdminListingComponent,
    FundAdminCreateComponent,
    FundAdminApproveComponent,
    AddCompanyBankComponent,
    ListCompanyBankComponent,
    CreateRetailerComponent,
    ListRetailerComponent,
    PermissionsComponent,
    CreateAsmComponent,
    ListAsmComponent,
    CreateSupdistributorComponent,
    ListSupdistributorComponent,
    RedirectComponent,
    PgRecepitComponent,
    StatementMatmComponent,
    StatementAepsComponent,
    StatementPgComponent,
    StatementAadharpayComponent,
    SendOtpComponent,
    TransactionComponent,
    CashdepositHandlerComponent,
    FundTransferComponent,
    ServiceControlComponent,
    FundTransferListComponent,
    AddNotificationComponent,
    ListNotificationComponent,
    NotificationhandlerComponent,
    ListComplaintComponent,
    CommissionComponent,
    AepsComponent,
    DmtComponent,
    MatmComponent,
    RechargeComponent,
    PgComponent,
    ListcomplaintComponent,
    AddcomplaintComponent,
    ComplainthandlerComponent,
    CheckTxnStatusComponent,
    RefundComponent,
    PolicyComponent,
    PayoutComponent,
    ListAccountComponent,
    AddAccountComponent,
    StatusEnquiryComponent,
    RefundCancellationPolicyComponent,
    TermConditionComponent,
    ContactUsComponent,
    TransactionDetailsComponent,
    AddRateComponent,
    TransactionsComponent,
    ComplaintChatComponent,
    ForgotPasswordComponent,
    PurchaseComponent,
    IdPurchaseComponent,
    PurchaseHistoryComponent,
    IdTransferComponent,
    PartnerDashboardComponent,
    SuperDistributorDashboardComponent,
    DistributorDashboardComponent,
    SuperDistributorComponent,
    PartnerComponent,
    SignupFormComponent,
    SignupUserListComponent,
    PrintDetailsComponent,
    MarchantOnboardingComponent,
    MarchantListComponent,
    MarchantDetailsComponent,
    OthercommComponent,
    BillpaycommComponent,
    CommAadhaarComponent,
    CommCashdepositComponent,
    CommMiniStatementComponent,
    CommSettlementComponent,
    MobikcommComponent,
    PaytmcomComponent,
    OnlyNumberDirective,
    CallbackurlComponent,
    ReplacePipe,
    CreateStaffComponent,
    AddFundComponent,
    ListStaffComponent,
    StatmentCreditLedgerComponent,
    StatmentDebitLedgerComponent,
    CreditCardBillComponent,
    CreditCardHandlerComponent,
    AadharPayReceiptComponent,
    CashWithdrawalReceiptComponent,
    BalanceEnquiryReceiptComponent,
    MiniStatementReceiptComponent,
    AepsReceiptComponent,
    UploadDocumentsComponent,
    KycUserListComponent,
    QueryComponent,
    ProcessComponent,
    MyprofileComponent,
    GetIndexPipe,
    DebitReceivingComponent,
    SlipPrintComponent,
    RiCustomMdlComponent,
    AutocompleteOffDirective,
    MinistatementTxnComponent,
    PanComponent,
    PanStatementComponent,
    StatementCreditComponent,
    StatementDebitComponent,
    ComplaintChatComponent2,
    PaytmWalletComponent,
    CommLicBillpayComponent,
    PancommComponent,
    CommLicBillpayComponent,
    PayoutCommissionComponent,
    CcBillPayComponent,
    CustomOtpComponent,
    FocusToNextInputDirective,
    SignUpComponent,
    MobikwikCheckWalletComponent,
    MobikwikCheckoutWalletComponent,
    StatementPayoutComponent,
    StatementCcpaymentComponent, 
    RetailerlistOfDistributorComponent,
    AllUserTreeComponent,
    VerificationBankComponent,
    DistributorlistOfSuperdistributorComponent,
    BannerShowComponent,
    BannerAddComponent,
    WalletqueryComponent,
    PayoutqueryComponent,
    PayoutprocessComponent,
    RechargequeryComponent,
    RechargeprocessComponent, 
    CreditCardQueryComponent,
    // FASTagComponent,
    StatementFastagComponent,
    // IciciCashDepositeComponent,
    StatementIciciDepositComponent,
    CreateTemplateComponent,
    DMTComponent,
    ListTemplateComponent,
    DmtListComponent,
    EditTemplateComponent,
    EditDmtComponent,
    EditAepsComponent,
    ListAepsComponent,
    CreateAepsComponent,
    CreateRechargeComponent,
    ListRechargeComponent,
    EditRechargeComponent,
    EditPayoutComponent,
    ListPayoutComponent,
    CreatePayoutComponent,
    CreateMatmComponent,
    ListMatmComponent,
    EditMatmComponent,
    CreatePaymentGatewayComponent,
    ListPaymentGatewayComponent,
    EditPaymentGatewayComponent,
    EditBBPStemplateComponent,
    ListBbpsComponent,
    CreateBbpsComponent,
    CreateAadharpeyComponent,
    ListAadharpayComponent,
    EditAadharpeyComponent,
    CreateLicComponent,
    CreateMinistatementComponent,
    EditLicComponent,
    EditMinistatementComponent,
    ListLicComponent,
    ListMinistatementComponent,
    ListPaytmWalletComponent,
    ListMobikwikWalletComponent,
    EditPaytmWalletComponent,
    EditMobikwikWalletComponent,
    CreatePaytmWalletComponent,
    CreateMobikwikWalletComponent,
    CreateFastagComponent,
    EditFastagComponent,
    ListFastagComponent,
    ListCCBILComponent,
    ListICICICWComponent,
    EditCCBILComponent,
    EditICICICWComponent,
    CreateCCBILLComponent,
    CreateICICICWComponent,
    CreatePanComponent,
    EditPanComponent,
    ListPanComponent,
    CommIciciDepositComponent,
    CommFastagComponent,
    IciciCashDepositeComponent,
    RetailerCertificateComponent,
    ServicesComponent,
    RetailerNotificationComponent,
    IciciCashdepositeQueryComponent,
    AddProductComponent,
    ProductListComponent,
    PuchaselistComponent,
    AsmComponent,
    PurchaseDetailsComponent,
    StatementProductComponent,
    CaseFreePgComponent,
    BbpsqueryComponent,
    PartnerlistOfSuperdistributorComponent,
    CreatePackageComponent,
    ChangeUserPasswordComponent,
    SelfsignupUserComponent,
    StatementAirtelCmsComponent,
    CommFinoCmsComponent,
    CreateFinoCmsComponent,
    ListFinoCmsComponent,
    EditFinoCmsComponent,
    StatementFinoCmsComponent,
    CommissionEarningComponent,
    FundDebitComponent,
    FundListingComponent
  ],
  imports: [
    BrowserModule,
    NgSelect2Module,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    NgOtpInputModule,
    AutocompleteLibModule,
    NgbModule,
    CKEditorModule,
    NgxPrintModule,
    ModalModule,
    NgApexchartsModule,
    CarouselModule,
    
  ],
  providers: [
    DatePipe,UserResolverService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
