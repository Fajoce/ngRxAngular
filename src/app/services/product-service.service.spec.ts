import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductServiceService } from './product-service.service';
import { Product } from '../models/product';
import { ResponseProduct } from '../models/response-product';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://localhost:7201/product';

  const dummyProducts: Product[] = [
    { id: 1, name: 'Teclado', price: 100 , categoryId:3},
    { id: 2, name: 'School shoes for kids', price: 50 , categoryId:2}
  ];

  const dummyProduct: Product = { id: 1, name: 'Teclado', price: 100, categoryId:3 };
  const dummyResponse: ResponseProduct = { success: true, message: 'OK' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductServiceService]
    });

    service = TestBed.inject(ProductServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener todos los productos (GET /all)', () => {
    service.getAll().subscribe(products => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/all`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('debe obtener un producto por ID (GET /single/:id)', () => {
    service.getById(1).subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/single/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('debe crear un producto (POST /create)', () => {
    service.create(dummyProduct).subscribe(res => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyProduct);
    req.flush(dummyResponse);
  });

  it('debe actualizar un producto (PUT /update/:id)', () => {
    service.update(dummyProduct).subscribe(res => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyProduct);
    req.flush(dummyResponse);
  });

  it('debe eliminar un producto (DELETE /delete/:id)', () => {
    service.delete(1).subscribe(res => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});