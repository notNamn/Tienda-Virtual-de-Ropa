import Title from "@/components/ui/Title";
import AddressForm from "@/components/checkout/AddressForm";
import getAllCountries from "@/service/CountryService";
import {auth} from "@/config/authConfig";
import {getUserAddress} from "@/service/UserAddressService";

export default async function VerificatedAddressPage() {
    const countries =  await getAllCountries();
    const session = await auth();
    const userAddress = await getUserAddress(session?.user?.id as string);
    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />

                <AddressForm
                    countries={countries}
                    userStoredAddres={userAddress}
                />

            </div>
        </div>
    );
}