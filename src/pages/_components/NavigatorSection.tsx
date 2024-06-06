import { ReactNode } from "react";

export default function NavigatorSection({}) {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
      <Dl>
        <Dt>Why Choose DelosNews?</Dt>

        <Dd>
          <b>Curated Content: </b>
          Only the best and most-read articles from the New York Times.
        </Dd>
        <Dd>
          <b>Easy Access: </b> Seamlessly browse, select, and purchase articles
          of your interest.
        </Dd>
        <Dd>
          <b>Exclusive Insights: </b>
          Gain access to premium content that keeps you informed and
          enlightened. Secure
        </Dd>
        <Dd>
          <b>Transactions: </b>
          Enjoy peace of mind with our safe and secure payment system.
        </Dd>
        <Dd>
          <b>User-FrienDdy Interface: </b>
          Navigate through our platform with ease and find the articles you need
          quickly.
        </Dd>
      </Dl>
      <Dl>
        <Dt>How It Works</Dt>
        <Dd>
          <b>Browse: </b>
          {`Explore a wide range of topics and articles
        from NYTimes' most popular section. `}
        </Dd>
        <Dd>
          <b>Select: </b>
          Choose the articles that pique your interest.
        </Dd>
        <Dd>
          <b>Purchase: </b>
          Purchase your selected articles through our secure checkout process.
        </Dd>
        <Dd>
          <b>Enjoy: </b>
          Enjoy premium content that keeps you informed and enlightened.
        </Dd>
      </Dl>
      <Dl>
        <Dt>Discover a World of Knowledge and Insight</Dt>
        <Dd>
          {`Whether you're looking for the latest in politics, culture, science, or technology, DelosNews has you covered. Our platform ensures you never miss out on the articles that matter most.`}
        </Dd>
      </Dl>
    </div>
  );
}

const Dt = ({ children }: { children: ReactNode }) => {
  return <dt className="mb-2 text-blue-500 font-bold">{children}</dt>;
};
const Dd = ({ children }: { children: ReactNode }) => {
  return <dd className="text-xs">{children}</dd>;
};

const Dl = ({ children }: { children: ReactNode }) => {
  return <dl className="rounded-xl bg-white p-4 border">{children}</dl>;
};
