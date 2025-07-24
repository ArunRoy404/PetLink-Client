import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDeletePetApi, useGetMyAddedPetsApi, useGetMyAddedPetsCountApi, useUpdatePetApi } from "../../axios/petsApi";
import {
    Button,
    IconButton,
    Typography,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
} from "@material-tailwind/react";
import {
    Edit,
    Trash2,
    PawPrint,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";


const columnHelper = createColumnHelper();

const MyAddedPets = () => {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    const { getMyAddedPetsPromise } = useGetMyAddedPetsApi();
    const { getMyAddedPetsCountPromise } = useGetMyAddedPetsCountApi();
    const { deletePetPromise } = useDeletePetApi()
    const { updatePetPromise } = useUpdatePetApi()
    const queryClient = useQueryClient()


    const handleDelete = (id) => {
        return deletePetPromise(id)
    }

    const handleDeleteDialog = (id) => {
        setPetToDelete(id);
        setDeleteDialog(true);
    };

    const confirmDelete = () => {
        const id = petToDelete
        mutateDeletePet(id)

        setDeleteDialog(false);
        setPetToDelete(null);
    };

    const handleAdopt = (petData) => {
        const updatePetData = { ...petData, adopted: true }
        return updatePetPromise(updatePetData)
    };



    const {
        data: petsData,
        isLoading: petsLoading,
        refetch: refetchData,
    } = useQuery({
        queryKey: ["my-added-pets", pagination],
        queryFn: () => getMyAddedPetsPromise(pagination.pageIndex, pagination.pageSize).then((res) => res.data),
        keepPreviousData: true,
    });

    const { data: countData, refetch: refetchCount } = useQuery({
        queryKey: ["my-added-pets-count"],
        queryFn: () => getMyAddedPetsCountPromise().then((res) => res.data),
    });




    const { mutate: mutateDeletePet } = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            notifySuccess('Pet Deleted')

            refetchData()
            refetchCount()

            queryClient.invalidateQueries(['my-added-pets'])
            queryClient.invalidateQueries(['my-added-pets-count'])
        },
        onError: () => {
            notifyError('Pet Delete Failed')
        }
    })

    const { mutate: mutateUpdatePet } = useMutation({
        mutationFn: handleAdopt,
        onSuccess: () => {
            notifySuccess('Marked as Adopted')
            refetchData()
            refetchCount()

            queryClient.invalidateQueries(['my-added-pets'])
            queryClient.invalidateQueries(['my-added-pets-count'])
        },
        onError: () => {
            notifyError('Pet Update Failed')
        }
    })


    const handlePageSizeChange = (value) => {
        setPagination(prev => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 0,
        }));
    };

    const columns = [
        columnHelper.accessor((row, index) => index + 1 + pagination.pageIndex * pagination.pageSize, {
            id: "serial",
            header: () => "#",
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petImage", {
            header: () => "Image",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="Pet"
                    className="w-20 h-12 rounded-lg object-cover border border-gray-200"
                />
            ),
        }),
        columnHelper.accessor("petName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Pet Name <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="font-medium text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petCategory", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Category <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("adopted", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Adoption Status <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${info.getValue() ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                >
                    {info.getValue() ? "Adopted" : "Not Adopted"}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const pet = row.original;
                return (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            color=""
                            variant="outlined"
                            onClick={() => navigate(`/dashboard/update-pet/${pet._id}`)}
                            className="flex items-center gap-1 border-primary text-primary"
                        >
                            <Edit size={16} /> Edit
                        </Button>
                        <Button
                            size="sm"
                            color="red"
                            variant="outlined"
                            onClick={() => handleDeleteDialog(pet._id)}
                            className="flex items-center gap-1"
                        >
                            <Trash2 size={16} /> Delete

                        </Button>
                        {!pet.adopted && (
                            <Button
                                size="sm"
                                color="green"
                                onClick={() => mutateUpdatePet(pet)}
                                className="flex items-center gap-1"
                            >
                                <PawPrint size={16} /> Adopt
                            </Button>
                        )}
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: petsData || [],
        columns,
        pageCount: Math.ceil((countData || 0) / pagination.pageSize),
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    });


    return (
        <div className="p-3 lg:p-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <Typography variant="h4" className="font-bold text-gray-900">My Added Pets</Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="text-gray-600">Show:</Typography>
                        <Select
                            value={pagination.pageSize.toString()}
                            onChange={handlePageSizeChange}
                            className="!min-w-20"
                        >
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                            <Option value="25">25</Option>
                        </Select>
                        <Typography variant="small" className="text-gray-600">entries</Typography>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="select-none px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            petsLoading && <TableSkeleton />
                        }
                        {
                            !petsLoading && !petsData?.length && <NoDataFoundTable message={"You haven't added any pets yet."} />
                        }
                        {
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-3 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div>
                    <Typography variant="small" className="text-gray-600">
                        Showing <span className="font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, countData || 0)}
                        </span>{' '}
                        of <span className="font-semibold">{countData || 0}</span> pets
                    </Typography>
                </div>

                <div className="flex items-center gap-2">
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full"
                    >
                        <ChevronsLeft size={18} />
                    </IconButton>
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full"
                    >
                        <ChevronLeft size={18} />
                    </IconButton>

                    <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                            let pageNumber;
                            if (table.getPageCount() <= 5) {
                                pageNumber = i;
                            } else if (table.getState().pagination.pageIndex <= 2) {
                                pageNumber = i;
                            } else if (table.getState().pagination.pageIndex >= table.getPageCount() - 3) {
                                pageNumber = table.getPageCount() - 5 + i;
                            } else {
                                pageNumber = table.getState().pagination.pageIndex - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNumber}
                                    variant={table.getState().pagination.pageIndex === pageNumber ? "filled" : "text"}
                                    size="sm"
                                    onClick={() => table.setPageIndex(pageNumber)}
                                    className={`rounded-full ${table.getState().pagination.pageIndex === pageNumber ? 'bg-primary' : ''}`}
                                >
                                    {pageNumber + 1}
                                </Button>
                            );
                        })}
                    </div>

                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full"
                    >
                        <ChevronRight size={18} />
                    </IconButton>
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full"
                    >
                        <ChevronsRight size={18} />
                    </IconButton>
                </div>
            </div>

            <Dialog open={deleteDialog} handler={() => setDeleteDialog(false)}>
                <DialogHeader>Confirm Deletion</DialogHeader>
                <DialogBody>Are you sure you want to delete this pet?</DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    <Button variant="gradient" color="red" onClick={confirmDelete}>Delete</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default MyAddedPets;
