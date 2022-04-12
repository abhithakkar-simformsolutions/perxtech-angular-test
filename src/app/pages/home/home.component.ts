import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Importing data from the json file
import data from '../../books.json';

// Importing services
import { NavbarService } from '../../services/navbar.service';

// Imprting interfaces
import { Books } from './interface/books';
import { BookFilter } from './interface/book-filter';

const BOOKS_DATA: Books[] = data.data.map(d => {
  return {
    id: d.id,
    type: d.type,
    content: d.attributes.content,
    created_at: d.attributes.created_at
  }
});


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'type', 'content', 'created_at'];
  dataSource = new MatTableDataSource(BOOKS_DATA);
  bookFilters: BookFilter[] = [];
  filterDictionary = new Map<string, string>();

  constructor(public navBarService: NavbarService) {
    // For showing navbar on the page
    navBarService.show();

    // For setting options in the filter for each column
    this.bookFilters.push({ name: "id", options: this.getUnique(['All', ...data.data.map(book => book.id)]), defaultValue: "All" });
    this.bookFilters.push({ name: "type", options: this.getUnique(['All', ...data.data.map(book => book.type)]), defaultValue: "All" });
    this.bookFilters.push({ name: "content", options: this.getUnique(['All', ...data.data.map(book => book.attributes.content)]), defaultValue: "All" });
    this.bookFilters.push({ name: "created_at", options: this.getUnique(['All', ...data.data.map(book => book.attributes.created_at)]), defaultValue: "All" });

    // For manipulating data according to the filter
    this.dataSource.filterPredicate = function (record: any, filters) {
      let map = new Map(JSON.parse(filters)),
          isMatch = false;
      for (let [key, value] of map) {
        isMatch = (value == "All") || (record[key as keyof Books] == value);
        if (!isMatch) return false;
      }
      return isMatch;
    }
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // Called when filter gets changed
  applyBookFilter(ob: MatSelectChange, datafilter: BookFilter) {
    this.filterDictionary.set(datafilter.name, ob.value);
    let jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
  }

  // Filter out the duplicate option in the filter
  getUnique = (d: string[]) => d.filter((v, i, a) => a.indexOf(v) === i);
}
