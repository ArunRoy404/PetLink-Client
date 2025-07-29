import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    IconButton,
    Typography,
    Option,
    Select,
    Progress,
    Avatar,
    Badge,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip
} from "@material-tailwind/react";
import {
    Edit,
    Pause,
    Play,
    Users,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    HeartHandshake
} from "lucide-react";
import { useNavigate } from "react-router";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { useGetMyCampaignsApi, useGetMyCampaignsCountApi, useUpdateCampaignApi } from "../../axios/donationApi";
import DonatorsDialog from "../../components/ui/DonatorsDialog";

const columnHelper = createColumnHelper();

const MyDonationCampaigns = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [donatorsDialog, setDonatorsDialog] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const { getMyCampaignsPromise } = useGetMyCampaignsApi();
    const { getMyCampaignsCountPromise } = useGetMyCampaignsCountApi();
    const { updateCampaignPromise } = useUpdateCampaignApi();


    const { mutate: mutateUpdateCampaign } = useMutation({
        mutationFn: (campaignData) => updateCampaignPromise(campaignData),
        onSuccess: () => {
            notifySuccess('Campaign updated successfully');
            queryClient.invalidateQueries(['my-donation-campaigns']);
        },
        onError: () => {
            notifyError('Failed to update campaign');
        }
    });


    const handlePauseToggle = (campaign) => {
        const updatedCampaign = { _id: campaign._id, paused: !campaign.paused };
        mutateUpdateCampaign(updatedCampaign);
    };

    const {
        data: campaignsData,
        isLoading: campaignsLoading,
    } = useQuery({
        queryKey: ["my-donation-campaigns", pagination],
        queryFn: () => getMyCampaignsPromise(pagination.pageIndex, pagination.pageSize).then((res) => res.data),
        keepPreviousData: true,
    });


    const { data: countData } = useQuery({
        queryKey: ["my-donation-campaigns-count"],
        queryFn: () => getMyCampaignsCountPromise().then((res) => res.data),
    });

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
            cell: (info) => <span className="font-medium dark:text-white flex">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Pet Name <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        src={info.row.original.petImage}
                        alt={info.getValue()}
                        size="sm"
                        className="border border-gray-200"
                    />
                    <span className="font-medium dark:text-white flex">{info.getValue()}</span>
                </div>
            ),
        }),
        columnHelper.accessor("maxDonationAmount", {
            id: "progress",
            header: "Progress",
            cell: (info) => {
                const campaign = info.row.original;
                // Calculate total donated amount from donations array
                const donatedAmount = campaign.donations?.reduce(
                    (total, donation) => total + donation.amount,
                    0
                ) || 0;

                const progress = Math.min(
                    (donatedAmount / info.getValue()) * 100,
                    100
                );

                return (
                    <div className="flex flex-col gap-1 w-full max-w-[200px]">
                        <div className="flex justify-between text-xs dark:text-white flex">
                            <span>${donatedAmount.toLocaleString()}</span>
                            <span>${info.getValue().toLocaleString()}</span>
                        </div>
                        <Progress
                            value={progress}
                            color={progress >= 100 ? "green" : "blue"}
                            className="h-2"
                        />
                        <span className="text-xs dark:text-white text-gray-600 dark:text-white flex">
                            {progress.toFixed(1)}% funded
                        </span>
                    </div>
                );
            },
        }),

        columnHelper.accessor("paused", {
            header: "Status",
            cell: (info) => (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${info.getValue() ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                    {info.getValue() ? "Paused" : "Active"}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const campaign = row.original;
                return (
                    <div className="flex gap-2">
                        <Tooltip content={campaign.paused ? "Resume campaign" : "Pause campaign"}>
                            <IconButton
                                variant="gradient"
                                size="sm"
                                color={campaign.paused ? "green" : "amber"}
                                onClick={() => handlePauseToggle(campaign)}
                            >
                                {campaign.paused ? <Play size={16} /> : <Pause size={16} />}
                            </IconButton>
                        </Tooltip>
                        <Button
                            size="sm"
                            color=""
                            variant="outlined"
                            onClick={() => navigate(`/dashboard/update-campaign/${campaign._id}`)}
                            className="flex items-center gap-1 border-primary text-primary"
                        >
                            <Edit size={16} /> Edit
                        </Button>
                        <Button
                            size="sm"
                            color="green"
                            variant="outlined"
                            onClick={() => {
                                setSelectedCampaign(campaign);
                                setDonatorsDialog(true);
                            }}
                            className="flex items-center gap-1"
                        >
                            <Users size={16} /> Donators
                        </Button>
                    </div>
                );
            },
        }),
    ];

    const prepareDonorsData = (campaign) => {
        if (!campaign?.donations) return [];

        return campaign.donations.map((donation, index) => ({
            id: index,
            userName: donation.donorName,
            userImage: "https://randomuser.me/api/portraits/men/1.jpg", // Default image or get from user data
            amount: donation.amount,
            donationDate: new Date(donation.createdAt).toLocaleDateString()
        }));
    };


    const table = useReactTable({
        data: campaignsData || [],
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
                <Typography variant="h4" className="font-bold dark:text-white text-gray-900  flex items-center gap-2">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    My Donation Campaigns
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="dark:text-white text-gray-600">Show:</Typography>
                        <Select
                            value={pagination.pageSize.toString()}
                            onChange={handlePageSizeChange}
                            className="!min-w-20 dark:text-white flex"
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
                        {campaignsLoading && <TableSkeleton colSpan={columns.length} />}
                        {!campaignsLoading && !campaignsData?.length && (
                            <NoDataFoundTable message={"You haven't created any donation campaigns yet."} colSpan={columns.length} />
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 dark:bg-gray-700 bg-gray-50 rounded-lg">
                <div>
                    <Typography variant="small" className="dark:text-white text-gray-600">
                        Showing <span className="font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, countData || 0)}
                        </span>{' '}
                        of <span className="font-semibold">{countData || 0}</span> campaigns
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

            {/* Donators Dialog */}
            <DonatorsDialog
                open={donatorsDialog}
                closeFn={() => setDonatorsDialog(false)}
                name={selectedCampaign?.petName}
                donators={selectedCampaign ? prepareDonorsData(selectedCampaign) : []}
            />

        </div>
    );
};

export default MyDonationCampaigns;