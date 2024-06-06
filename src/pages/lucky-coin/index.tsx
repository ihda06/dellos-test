import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { BiCoinStack } from "react-icons/bi";

export default function LuckyCoinPage() {
  const reedem_ticket = getCookie("reedem_ticket");
  const my_coin = getCookie("my_coin");

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [rewardList, setRewardList] = useState([
    "50,000",
    "20,000",
    "Try Again",
    "Free Subscription for 6 Months",
  ]);
  const [reward, setReward] = useState("");
  useEffect(() => {
    setIsLoading(false);
  }, []);

  console.log(reedem_ticket);

  const handleRedeem = () => {
    if (Number(reedem_ticket) > 0) {
      setModal(true);
      setCookie("reedem_ticket", (Number(reedem_ticket) - 1).toString());
      const randomIndex = Math.floor(Math.random() * rewardList.length);
      switch (rewardList[randomIndex]) {
        case "Try Again":
          setReward("Try Again");
          break;
        case "Free Subscription for 6 Months":
          setReward("Free Subscription for 6 Months");
          break;
        case "50,000":
          setCookie(
            "my_coin",
            (Number(getCookie("my_coin")) + 50000).toString()
          );
          setReward("50,000");
          setRewardList(rewardList.filter((item) => item !== "50,000"));
          break;
        case "20,000":
          setCookie(
            "my_coin",
            (Number(getCookie("my_coin")) + 20000).toString()
          );
          setReward("20,000");
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="p-3 ">
        <div className="py-10 space-y-10">
          <h2 className="text-7xl font-bold text-center text-blue-800">
            Lucky Coin
          </h2>
          <div className="flex gap-3 items-center w-full justify-center">
            {isLoading ? (
              <div
                className="w-28 h-5 bg-gray-300 animate-pulse rounded-full"
                data-testid="loading"
              ></div>
            ) : reedem_ticket ? (
              <h6 className="text-3xl font-bold">{reedem_ticket} 🎟️ </h6>
            ) : (
              <h6 className="text-3xl font-bold">0 🎟️ </h6>
            )}
            <button
              disabled={!reedem_ticket}
              onClick={handleRedeem}
              className="py-2 px-4 text-white bg-black rounded-full hover:bg-blue-800 duration-300 hover:text-white font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Reedem
            </button>
            {/* <h6>{reedemTicket}</h6> */}
          </div>
          <div className="flex gap-0.5 items-center justify-center">
            <h4 className="text-lg font-black">
              Your Coin: {Intl.NumberFormat().format(Number(my_coin))}
            </h4>
            <BiCoinStack className="text-yellow-500" size={30} />
          </div>
        </div>
        <div className="pt-7 space-y-5">
          <h2 className="text-3xl font-bold text-center text-blue-800">
            4 Reward in Lucky Draw
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Prize A */}
            <dl className="p-4 border rounded-lg">
              <dt className="text-lg font-bold">50,000 Coins</dt>
              <dd className="mt-2">
                Receive 50,000 coins as the minimum reward, only once.
              </dd>
            </dl>

            {/* Prize B */}
            <dl className="p-4 border rounded-lg">
              <dt className="text-lg font-bold">20,000 Coins</dt>
              <dd className="mt-2">
                Enjoy a reward of 20,000 coins as the second option in the lucky
                draw.
              </dd>
            </dl>

            {/* Prize C */}
            <dl className="p-4 border rounded-lg">
              <dt className="text-lg font-bold">Try Again</dt>
              <dd className="mt-2">{`Try again if you're not lucky this time.`}</dd>
            </dl>

            {/* Prize D */}
            <dl className="p-4 border rounded-lg">
              <dt className="text-lg font-bold">Premium Subscription</dt>
              <dd className="mt-2">
                Get a free premium subscription for a certain period.
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Transition
        show={modal}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          onClose={() => setModal(false)}
          className="relative z-50 transition"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 bg-white p-7 rounded-lg">
              <DialogTitle className="font-bold">
                {reward !== "Try Again" ? "Congratulation 🎉🎉" : "Try Again"}
              </DialogTitle>
              <Description>
                {reward !== "Try Again"
                  ? `You have earned ${reward}`
                  : "You have not earned any reward yet"}
              </Description>
              <div className="flex gap-1.5 justify-end">
                <button
                  onClick={() => setModal(false)}
                  className="text-red-500 px-4 py-2 rounded-lg hover:bg-gray-200 font-bold duration-300 "
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
