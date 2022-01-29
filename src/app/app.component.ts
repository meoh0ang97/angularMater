import { Component, ViewChild } from '@angular/core';
import { TreeView, VendorService } from './service/Vendor.service';
import { VendorSearchModel } from './model/VendorSearchModel';
import { VendorDTO } from './model/VendorDTO';
import { ResultMessageResponse } from './model/ResultMessageResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditvendorComponent } from './edit/editvendor/editvendor.component';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'my-app';
//tree-view
private _transformer = (node: TreeView, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
  };
};

treeControl = new FlatTreeControl<ExampleFlatNode>(
  node => node.level,
  node => node.expandable,
);

treeFlattener = new MatTreeFlattener(
  this._transformer,
  node => node.level,
  node => node.expandable,
  node => node.children,
);

dataSourceTreee = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  //
  panelOpenState = false;
  animal: string='';
  name: string='';
  checkedl=false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 50, 100];
  displayedColumns: string[] = ['id', 'name', 'code', 'address', 'phone', 'email', 'inactive', 'method'];
  dataSource = new MatTableDataSource<VendorDTO>();
  model: VendorSearchModel = {
    active: null,
    keySearch: '',
    skip: this.currentPage * this.pageSize,
    take: this.pageSize
  };
  list: ResultMessageResponse<VendorDTO> = {
    success: false,
    code: '',
    httpStatusCode: 0,
    title: '',
    message: '',
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: '',
    errors: {}
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private service: VendorService, private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog) {
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.GetData();
    this.service.getTreeView().subscribe(x=>this.dataSourceTreee.data=x.data);
  }
  lll(l:string){
    console.log(l);
  }
  GetData() {
    this.service.getList(this.model).subscribe(list => {
      this.dataSource.data = list.data; setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = list.totalCount;
      });
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.model.skip = event.pageIndex * event.pageSize;
    this.model.take = event.pageSize;
    this.GetData();
  }
  searchQuery() {
    var val = document.getElementById("searchInput") as HTMLInputElement;
    this.model.keySearch = val.value;
    this.model.active=this.checkedl;
    console.log(this.checkedl)
    this.GetData();
  }
  openDialog(): void {
    var val = document.getElementById("searchInput") as HTMLInputElement;

    const dialogRef = this.dialog.open(EditvendorComponent, {
      width: '250px',
      data: {name: val.value, animal:"animal"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
