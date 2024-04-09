
import instance from "@/config/axios";
import { Banner, Services } from "../../../components/HomePages"
import "@/style/checkout.css"
import { useMutation } from "@tanstack/react-query";
import useCart from "@/hooks/carts/useCartQuery";
import { useLocalStorage } from "@/hooks/useStorage";
import { useForm } from "react-hook-form";
import { Iproduct } from "@/intertaces/product";
import { useToast } from "@/components/ui/use-toast";

const CheckOut = () => {
    const { toast } = useToast()
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calcuateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await instance.post("/orders", order);
            return data;
        },
        onSuccess: () => {
            // navigate("/thankyou")
            toast({
                title: "Đặt hàng thành công",
                variant: "success"
            })
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calcuateTotal(),
            customerInfo: formData,
        });
    };
    return (
        <>
            <Banner />
            <section className="checkout">
                <div className="container">
                    <div className="checkout-block">
                        <div className="bill">
                            <h2 className="bill-heading">Billing details</h2>
                            <form className="form-bill" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="faaaa">
                                    <div className="bill-full-name">
                                        <div className="bill-block">
                                            <p className="bill-block__name">First Name</p>
                                            <input type="text" className="bill-block-input" {...form.register("firstname")} />
                                        </div>
                                        <div className="bill-block">
                                            <p className="bill-block__name">Last Name</p>
                                            <input type="text" className="bill-block-input" {...form.register("lastname")} />
                                        </div>
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Company Name (Optional)</span>
                                        <input type="text" className="bill-body__input" {...form.register("name")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Country / Region</span>
                                        <select name="" id="" className="bill-body__input">
                                            <option value="" />
                                        </select>
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Street address</span>
                                        <input type="text" className="bill-body__input" {...form.register("address")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Town / City</span>
                                        <input type="text" className="bill-body__input" {...form.register("city")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Province</span>
                                        <select name="" id="" className="bill-body__input">
                                            <option value="" />
                                            <option value="" />
                                        </select>
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">ZIP code</span>
                                        <input type="text" className="bill-body__input" {...form.register("code")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Phone</span>
                                        <input type="text" className="bill-body__input" {...form.register("phone")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Email address</span>
                                        <input type="text" className="bill-body__input" {...form.register("email")} />
                                    </div>
                                    <div className="bill-body">
                                        <input type="text" className="bill-body__input" placeholder="Additional information" {...form.register("additional")} />
                                    </div>
                                </div>

                                <div className="bill-products">
                                    {data?.products?.map((item: Iproduct, index: number) => (
                                        <div className="bill-products-heading" key={index}>

                                            <div className="bill-products-heading__left">
                                                <p className="heading__left--title">Product</p>
                                                <p className="heading__left--text color">{item.name}</p>
                                                <p className="heading__left--text">Số lượng</p>

                                            </div>
                                            <div className="bill-products-heading__right">
                                                <p className="heading__right--title">Subtotal</p>
                                                <p className="heading__right--text">{item.price}</p>
                                                <p className="heading__right--text">{item.quantity}</p>

                                            </div>
                                        </div>
                                    ))}
                                    <div className="totals">
                                        <p className="heading__left--text">Total</p>
                                        <p className="heading__right--text orange">{calcuateTotal()}</p>
                                    </div>
                                    <div className="bill-products-desc">
                                        <div className="desc-check">
                                            <input className="desc__input" type="radio" /> <span className="desc__input--color">Direct Bank
                                                Transfer</span>
                                        </div>
                                        <p className="desc__text--color">
                                            Make your payment directly into our bank account. Please use your Order ID as the payment
                                            reference.
                                            Your order will not be shipped until the funds have cleared in our account.
                                        </p>
                                        <div className="desc-check">
                                            <input className="desc__input" type="radio" /> <span className="desc__input--color">Direct Bank
                                                Transfer</span>
                                        </div>
                                        <div className="desc-check">
                                            <input className="desc__input" type="radio" /> <span className="desc__input--color">Cash On
                                                Delivery</span>
                                        </div>
                                        <div className="desc__text">Your personal data will be used to support your experience throughout
                                            this
                                            website,
                                            to manage access to your account, and for other purposes described in our <strong>privacy
                                                policy</strong>.
                                        </div>

                                    </div>
                                    <button type="submit" className="desc__btn">Place order</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <Services />
        </>


    )
}

export default CheckOut