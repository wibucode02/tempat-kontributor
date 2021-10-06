@extends('layouts.default')

@section('content')
    <div class="orders" >
        <div class="row" >
            <div class="col-12" >
                <div class="card" >
                    <div class="card-body" >
                        <h4 class="box-title" >
                            Daftar Barang
                        </h4>
                    </div>
                    <div class="card-body--" >
                        <div class="table-stats order-table ov-h">
                            <table class="table" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Quatity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($items as $item)
                                    <tr>
                                        <td>{{ $item->id }}</td>
                                        <td>{{ $item->name }}</td>
                                        <td>{{ $item->type }}</td>
                                        <td>{{ $item->price }}</td>
                                        <td>{{ $item->quantity }}</td>
                                        <td>
                                            <a href="#" class="btn btn-info btn-sm" >
                                                <i class="fa fa-picture-o"  ></i>
                                            </a>
                                            <a href={{route('products.edit', $item->id)}} class="btn btn-primary btn-sm" >
                                                <i class="fa fa-pencil"  ></i>
                                            </a>
                                            <form action={{route('products.destroy', $item->id)}} method="post" class="d-inline"  >
                                                @csrf
                                                @method('delete')
                                                <button class="btn btn-danger btn-sm" > 
                                                    <i class="fa fa-trash" ></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                    @empty
                                        <tr>
                                            <td colspan="6" class="text-center p-5" >
                                                Data Tidak Tersedia
                                            </td>
                                        </tr>
                                    @endforelse
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection