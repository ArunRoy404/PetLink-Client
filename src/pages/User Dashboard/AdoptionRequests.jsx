import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import {
    Button,
    IconButton,
    Typography,
    Option,
    Select,
    Avatar,
    Badge,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip
} from "@material-tailwind/react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    PawPrint,
    Check,
    X,
    User
} from "lucide-react";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";

const columnHelper = createColumnHelper();

const AdoptionRequests = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [actionDialog, setActionDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionType, setActionType] = useState(null); // 'accept' or 'reject'

    // Dummy data for adoption requests
    const dummyRequests = [
        {
            id: 1,
            petId: "pet1",
            petImage: "https://i.ibb.co/wZv42XK5/pet1.jpg",
            petName: "Buddy",
            requesterName: "John Doe",
            requesterEmail: "john@example.com",
            requesterPhone: "+1 555-123-4567",
            requesterLocation: "New York, USA",
            requestDate: "2025-07-20",
            status: "pending" // 'pending', 'accepted', 'rejected'
        },
        {
            id: 2,
            petId: "pet2",
            petImage: "https://i.ibb.co/wZv42XK5/pet2.jpg",
            petName: "Luna",
            requesterName: "Jane Smith",
            requesterEmail: "jane@example.com",
            requesterPhone: "+1 555-987-6543",
            requesterLocation: "Los Angeles, USA",
            requestDate: "2025-07-18",
            status: "pending"
        },
        {
            id: 3,
            petId: "pet3",
            petImage: "https://i.ibb.co/wZv42XK5/pet3.jpg",
            petName: "Max",
            requesterName: "Robert Johnson",
            requesterEmail: "robert@example.com",
            requesterPhone: "+1 555-456-7890",
            requesterLocation: "Chicago, USA",
            requestDate: "2025-07-15",
            status: "pending"
        },
        {
            id: 4,
            petId: "pet4",
            petImage: "https://i.ibb.co/wZv42XK5/pet4.jpg",
            petName: "Bella",
            requesterName: "Emily Davis",
            requesterEmail: "emily@example.com",
            requesterPhone: "+1 555-789-0123",
            requesterLocation: "Houston, USA",
            requestDate: "2025-07-10",
            status: "pending"
        },
        {
            id: 5,
            petId: "pet5",
            petImage: "https://i.ibb.co/wZv42XK5/pet5.jpg",
            petName: "Charlie",
            requesterName: "Michael Wilson",
            requesterEmail: "michael@example.com",
            requesterPhone: "+1 555-234-5678",
            requesterLocation: "Phoenix, USA",
            requestDate: "2025-07-05",
            status: "pending"
        },
    ];

    // Commented out API functions for reference
    /*
    const { getAdoptionRequestsPromise } = useGetAdoptionRequestsApi();
    const { updateAdoptionRequestPromise } = useUpdateAdoptionRequestApi();
    */

    const handleActionClick = (request, type) => {
        setSelectedRequest(request);
        setActionType(type);
        setActionDialog(true);
    };

    const confirmAction = () => {
        console.log(`${actionType}ing request for ${selectedRequest.petName} by ${selectedRequest.requesterName}`);
        
        // Commented out actual API call
        /*
        updateAdoptionRequestPromise({
            requestId: selectedRequest.id,
            status: actionType === 'accept' ? 'accepted' : 'rejected'
        }).then(() => {
            // Refresh data or update local state
        });
        */
        
        // Update local dummy data
        // const updatedRequests = dummyRequests.map(req => 
        //     req.id === selectedRequest.id 
        //         ? { ...req, status: actionType === 'accept' ? 'accepted' : 'rejected' } 
        //         : req
        // );
        // In real implementation, you would set state here
        
        setActionDialog(false);
        setSelectedRequest(null);
        setActionType(null);
    };

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
            header: () => "Pet",
            cell: (info) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        src={info.getValue()}
                        alt={info.row.original.petName}
                        size="sm"
                        className="border border-gray-200"
                    />
                    <span className="font-medium">{info.row.original.petName}</span>
                </div>
            ),
        }),
        columnHelper.accessor("requesterName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Requester <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        variant="circular"
                        size="sm"
                        className="border border-gray-200 bg-blue-50"
                        icon={<User className="h-4 w-4" />}
                    />
                    <div>
                        <Typography variant="small" className="font-medium">
                            {info.getValue()}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                            {info.row.original.requesterEmail}
                        </Typography>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor("requesterPhone", {
            header: "Phone",
            cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("requesterLocation", {
            header: "Location",
            cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("requestDate", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Request Date <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <span className="text-gray-700">
                    {new Date(info.getValue()).toLocaleDateString()}
                </span>
            ),
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
                <Badge
                    color={
                        info.getValue() === 'accepted' ? 'green' : 
                        info.getValue() === 'rejected' ? 'red' : 'amber'
                    }
                    className="rounded-full"
                >
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        info.getValue() === 'accepted' ? 'bg-green-100 text-green-800' :
                        info.getValue() === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                    }`}>
                        {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                    </span>
                </Badge>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const request = row.original;
                return (
                    <div className="flex gap-2">
                        {request.status === 'pending' && (
                            <>
                                <Tooltip content="Accept request">
                                    <IconButton
                                        variant="gradient"
                                        size="sm"
                                        color="green"
                                        onClick={() => handleActionClick(request, 'accept')}
                                    >
                                        <Check size={16} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Reject request">
                                    <IconButton
                                        variant="gradient"
                                        size="sm"
                                        color="red"
                                        onClick={() => handleActionClick(request, 'reject')}
                                    >
                                        <X size={16} />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: dummyRequests,
        columns,
        pageCount: Math.ceil(dummyRequests.length / pagination.pageSize),
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
                <Typography variant="h4" className="font-bold text-gray-900 flex items-center gap-2">
                    <PawPrint className="h-6 w-6 text-primary" />
                    Adoption Requests
                </Typography>
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
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-3 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div>
                    <Typography variant="small" className="text-gray-600">
                        Showing <span className="font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, dummyRequests.length)}
                        </span>{' '}
                        of <span className="font-semibold">{dummyRequests.length}</span> requests
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

            {/* Action Confirmation Dialog */}
            <Dialog open={actionDialog} handler={() => setActionDialog(false)}>
                <DialogHeader>
                    {actionType === 'accept' ? 'Accept' : 'Reject'} Adoption Request
                </DialogHeader>
                <DialogBody>
                    Are you sure you want to {actionType} the adoption request for <span className="font-bold">{selectedRequest?.petName}</span> from <span className="font-bold">{selectedRequest?.requesterName}</span>?
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setActionDialog(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="gradient" 
                        color={actionType === 'accept' ? "green" : "red"} 
                        onClick={confirmAction}
                    >
                        {actionType === 'accept' ? 'Accept' : 'Reject'} Request
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default AdoptionRequests;