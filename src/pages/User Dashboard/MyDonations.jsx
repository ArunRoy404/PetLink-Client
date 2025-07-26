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
    HeartHandshake,
    Undo2
} from "lucide-react";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";

const columnHelper = createColumnHelper();

const MyDonations = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [refundDialog, setRefundDialog] = useState(false);
    const [donationToRefund, setDonationToRefund] = useState(null);

    // Dummy data for donations
    const dummyDonations = [
        {
            id: 1,
            petImage: "https://i.ibb.co/wZv42XK5/pet1.jpg",
            petName: "Buddy",
            donatedAmount: 150,
            donationDate: "2025-07-20",
            campaignId: "camp1"
        },
        {
            id: 2,
            petImage: "https://i.ibb.co/wZv42XK5/pet2.jpg",
            petName: "Luna",
            donatedAmount: 200,
            donationDate: "2025-07-18",
            campaignId: "camp2"
        },
        {
            id: 3,
            petImage: "https://i.ibb.co/wZv42XK5/pet3.jpg",
            petName: "Max",
            donatedAmount: 100,
            donationDate: "2025-07-15",
            campaignId: "camp3"
        },
        {
            id: 4,
            petImage: "https://i.ibb.co/wZv42XK5/pet4.jpg",
            petName: "Bella",
            donatedAmount: 250,
            donationDate: "2025-07-10",
            campaignId: "camp4"
        },
        {
            id: 5,
            petImage: "https://i.ibb.co/wZv42XK5/pet5.jpg",
            petName: "Charlie",
            donatedAmount: 75,
            donationDate: "2025-07-05",
            campaignId: "camp5"
        },
        {
            id: 6,
            petImage: "https://i.ibb.co/wZv42XK5/pet6.jpg",
            petName: "Lucy",
            donatedAmount: 300,
            donationDate: "2025-06-28",
            campaignId: "camp6"
        },
        {
            id: 7,
            petImage: "https://i.ibb.co/wZv42XK5/pet7.jpg",
            petName: "Cooper",
            donatedAmount: 125,
            donationDate: "2025-06-25",
            campaignId: "camp7"
        },
        {
            id: 8,
            petImage: "https://i.ibb.co/wZv42XK5/pet8.jpg",
            petName: "Daisy",
            donatedAmount: 175,
            donationDate: "2025-06-20",
            campaignId: "camp8"
        },
        {
            id: 9,
            petImage: "https://i.ibb.co/wZv42XK5/pet9.jpg",
            petName: "Rocky",
            donatedAmount: 225,
            donationDate: "2025-06-15",
            campaignId: "camp9"
        },
        {
            id: 10,
            petImage: "https://i.ibb.co/wZv42XK5/pet10.jpg",
            petName: "Molly",
            donatedAmount: 150,
            donationDate: "2025-06-10",
            campaignId: "camp10"
        }
    ];

    const handleRefundRequest = (donation) => {
        console.log("Requesting refund for donation:", donation);
        setDonationToRefund(donation);
        setRefundDialog(true);
    };

    const confirmRefund = () => {
        console.log("Refund confirmed for donation:", donationToRefund);
        setRefundDialog(false);
        setDonationToRefund(null);
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
            header: () => "Pet Image",
            cell: (info) => (
                <Avatar
                    src={info.getValue()}
                    alt={info.row.original.petName}
                    size="sm"
                    className="border border-gray-200"
                />
            ),
        }),
        columnHelper.accessor("petName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Pet Name <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor("donatedAmount", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Donated Amount <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <span className="font-medium text-green-600">
                    ${info.getValue().toLocaleString()}
                </span>
            ),
        }),
        columnHelper.accessor("donationDate", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Date <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <span className="text-gray-700">
                    {new Date(info.getValue()).toLocaleDateString()}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const donation = row.original;
                return (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            color="red"
                            variant="outlined"
                            onClick={() => handleRefundRequest(donation)}
                            className="flex items-center gap-1"
                        >
                            <Undo2 size={16} /> Refund
                        </Button>
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: dummyDonations,
        columns,
        pageCount: Math.ceil(dummyDonations.length / pagination.pageSize),
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
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    My Donations
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
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, dummyDonations.length)}
                        </span>{' '}
                        of <span className="font-semibold">{dummyDonations.length}</span> donations
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

            {/* Refund Confirmation Dialog */}
            <Dialog open={refundDialog} handler={() => setRefundDialog(false)}>
                <DialogHeader>Confirm Refund Request</DialogHeader>
                <DialogBody>
                    Are you sure you want to request a refund of ${donationToRefund?.donatedAmount.toLocaleString()} for {donationToRefund?.petName}?
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setRefundDialog(false)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="red" onClick={confirmRefund}>
                        Request Refund
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default MyDonations;