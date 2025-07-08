export interface CreateDetailsInvoiceRequest  {
  invoiceId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
