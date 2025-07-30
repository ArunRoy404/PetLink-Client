import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
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
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { useAuthContext } from "../../context/AuthContext";
import { useGetAdoptionRequestsApi, useGetAdoptionRequestsCountApi, useUpdateAdoptionApi } from "../../axios/AdoptionApi";
import Loader from "../../components/ui/Loader";

const columnHelper = createColumnHelper();

const AdoptionRequests = () => {
    const { firebaseUser } = useAuthContext();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [actionDialog, setActionDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionType, setActionType] = useState(null); // 'accept' or 'reject'
    const [isUpdating, setIsUpdating] = useState(false);

    const { getAdoptionRequestsPromise } = useGetAdoptionRequestsApi();
    const { getAdoptionRequestsCountPromise } = useGetAdoptionRequestsCountApi();
    const { updateAdoptionPromise } = useUpdateAdoptionApi();

    const { data: requestsData, isLoading: requestsLoading, refetch } = useQuery({
        queryKey: ["adoption-requests", pagination, firebaseUser?.email],
        queryFn: () => getAdoptionRequestsPromise(
            pagination.pageIndex,
            pagination.pageSize,
            firebaseUser?.email
        ).then(res => res.data),
        enabled: !!firebaseUser?.email,
        keepPreviousData: true,
    });

    const { data: countData } = useQuery({
        queryKey: ["adoption-requests-count", firebaseUser?.email],
        queryFn: () => getAdoptionRequestsCountPromise(firebaseUser?.email).then(res => res.data),
        enabled: !!firebaseUser?.email,
    });

    console.log(countData);

    const handleActionClick = (request, type) => {
        setSelectedRequest(request);
        setActionType(type);
        setActionDialog(true);
    };

    const confirmAction = async () => {
        if (!selectedRequest || !actionType) return;

        setIsUpdating(true);
        try {
            const newStatus = actionType === 'accept' ? 'accepted' : 'rejected';
            await updateAdoptionPromise({
                _id: selectedRequest.adoptionInfo._id,
                status: newStatus
            });

            notifySuccess(`Request ${newStatus} successfully`);
            refetch(); // Refresh the data after update
        } catch (error) {
            notifyError(`Failed to update request: ${error.message}`);
        } finally {
            setIsUpdating(false);
            setActionDialog(false);
            setSelectedRequest(null);
            setActionType(null);
        }
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
            cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
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
                    <span className="font-medium dark:text-white">{info.row.original.petName}</span>
                </div>
            ),
        }),
        columnHelper.accessor("adoptionInfo.userEmail", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Requester <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <div className="flex items-center gap-3">
                    <div>
                        <Typography variant="small" className="font-medium dark:text-white">
                            {info.getValue()}
                        </Typography>
                        <Typography variant="small" className="dark:text-white text-gray-600">
                            {info.row.original.adoptionInfo.phone}
                        </Typography>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor("adoptionInfo.address", {
            header: "Location",
            cell: (info) => <span className="dark:text-white text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("adoptionInfo.requestDate", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Request Date <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <span className="dark:text-white text-gray-700">
                    {new Date(info.getValue()).toLocaleDateString()}
                </span>
            ),
        }),
        columnHelper.accessor("adoptionInfo.status", {
            header: "Status",
            cell: (info) => (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${info.getValue() === 'accepted' ? 'bg-green-100 text-green-800' :
                        info.getValue() === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                    }`}>
                    {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const request = row.original;
                const isPending = request.adoptionInfo.status === 'pending';

                return (
                    <div className="flex gap-2">
                        <Tooltip content={isPending ? "Accept request" : "Request already processed"}>
                            <IconButton
                                variant="gradient"
                                size="sm"
                                color="green"
                                onClick={() => isPending && handleActionClick(request, 'accept')}
                                disabled={!isPending}
                            >
                                <Check size={16} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content={isPending ? "Reject request" : "Request already processed"}>
                            <IconButton
                                variant="gradient"
                                size="sm"
                                color="red"
                                onClick={() => isPending && handleActionClick(request, 'reject')}
                                disabled={!isPending}
                            >
                                <X size={16} />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: requestsData || [],
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
                <Typography variant="h4" className="font-bold dark:text-white text-gray-900 flex items-center gap-2">
                    <PawPrint className="h-6 w-6 text-primary" />
                    Adoption Requests
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="dark:text-white text-gray-600">Show:</Typography>
                        <Select
                            value={pagination.pageSize.toString()}
                            onChange={handlePageSizeChange}
                            className="!min-w-20 dark:text-white"
                        >
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                            <Option value="25">25</Option>
                        </Select>
                        <Typography variant="small" className="dark:text-white text-gray-600">entries</Typography>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="select-none px-6 py-4 text-left text-sm font-semibold dark:text-white text-gray-700 uppercase tracking-wider cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requestsLoading && <TableSkeleton colSpan={columns.length} />}
                        {!requestsLoading && !requestsData?.length && (
                            <NoDataFoundTable message={"No adoption requests found"} colSpan={columns.length} />
                        )}
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900 transition-colors">
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                    <Typography variant="small" className="dark:text-white text-gray-600">
                        Showing <span className="font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, countData || 0)}
                        </span>{' '}
                        of <span className="font-semibold">{countData || 0}</span> requests
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
            <Dialog open={actionDialog} handler={() => !isUpdating && setActionDialog(false)}>
                <DialogHeader>
                    {actionType === 'accept' ? 'Accept' : 'Reject'} Adoption Request
                </DialogHeader>
                <DialogBody>
                    Are you sure you want to {actionType} the adoption request for <span className="font-bold">{selectedRequest?.petName}</span> from <span className="font-bold">{selectedRequest?.adoptionInfo.userEmail}</span>?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => setActionDialog(false)}
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color={actionType === 'accept' ? "green" : "red"}
                        onClick={confirmAction}
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <Loader size="sm" />
                        ) : (
                            actionType === 'accept' ? 'Accept' : 'Reject'
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default AdoptionRequests;