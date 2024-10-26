import ReviewCard from "../../components/TailwindSearchComp/reviews/ReviewCard";
import ReviewForm from "../../components/TailwindSearchComp/reviews/ReviewForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import ReviewSlider from "../../components/TailwindSearchComp/reviews/ReviewSlider";
export default function UserReview() {
  return (
    <div className="w-full p-10 flex flex-col gap-5">
      <h1 className="text-center text-3xl font-semibold">Customer Rivew</h1>
      <div className="">
        {/* <ReviewCard className="" /> */}
        <ReviewSlider />
      </div>
      <ReviewForm />
    </div>
  );
}
