import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tally, TallyTypes } from '../../models/tally.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { ShopLocation } from '../../models/shop.model';
import { Rack } from '../../models/rack.model';

@Component({
  selector: 'app-tally-list',
  templateUrl: './tally-list.component.html',
  styleUrls: ['./tally-list.component.scss']
})
export class TallyListComponent {

  filterTallyForm!: FormGroup
  displayedColumns: string[] = ['tallyName', 'customerName', 'tallyType', 'shopName', 'date', 'notes', 'actions'];
  dataSource: MatTableDataSource<Tally> = new MatTableDataSource<Tally>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tallies: any[] = [
    {
      tallyId: 'tally1',
      tallyName: 'Tally 1',
      customerId: 'customer1',
      customerName: 'Customer 1',
      shopLocationId: 'shop1',
      shopName: 'Shop 1',
      tallyType: 'In',
      dateOfCreation: new Date(),
      notes: 'Some notes'
    },
    {
      tallyId: 'tally2',
      tallyName: 'Tally 2',
      customerId: 'customer2',
      customerName: 'Customer 2',
      shopLocationId: 'shop2',
      shopName: 'Shop 2',
      tallyType: 'Out',
      dateOfCreation: new Date(),
      notes: 'Some notes'
    },
    {
      tallyId: 'tally3',
      tallyName: 'Tally 3',
      customerId: 'customer3',
      customerName: 'Customer 3',
      shopLocationId: 'shop3',
      shopName: 'Shop 3',
      tallyType: 'In',
      dateOfCreation: new Date(),
      notes: 'Some notes'
    }
  ];

  tallyNames: Tally[] = [];
  customers: Customer[] = [];
  shops: ShopLocation[] = [];
  racks: Rack[] = [];

  ngOnInit(): void {
    console.log('tally list onInit');
    
    this.dataSource = new MatTableDataSource(this.tallies);
    this.buildForm();       
  }

  buildForm() {
    this.filterTallyForm = new FormGroup({
      tally: new FormControl<Tally | null>(null, []),   
      customer: new FormControl('', []),
      shopLocation: new FormControl('', []),
      rack: new FormControl('', []),
      dateStart: new FormControl<Date | null>(null, []),
      dateEnd: new FormControl<Date | null>(null, []),         
    });
  }

  filter() {
    console.log('filter');    
  }

  addTally() {
    console.log('add tally');    
  }

  editTally(tally: Tally) {
    console.log('edit tally');    
  }

  clearForm() {
    this.filterTallyForm.reset();
  }




}
