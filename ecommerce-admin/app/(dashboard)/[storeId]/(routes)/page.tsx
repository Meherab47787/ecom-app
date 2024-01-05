import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/getGraphrevenue";

interface dashboardPageProps {
    params: { storeId: string }
}

const Dashboardpage: React.FC<dashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphrevenue = await getGraphRevenue(params.storeId);

    return ( 

        <div className="flex-col">
            <div className="flex-1 space-y-3 p-8 pt-6">
                <Heading title="Dashboard" description="The overview of your store"/>
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total revenue
                            </CardTitle>
                            <span className="text-md text-slate-600">৳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                { salesCount }
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                { stockCount }
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphrevenue}/>
                    </CardContent>
                </Card>
            </div>
        </div>

     );
}
 
export default Dashboardpage;