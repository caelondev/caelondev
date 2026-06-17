import Link from "../Link";
import Empty from "../Empty";
import type { CommandContext } from "../../types";

const contacts = [
  {
    platform: "discord",
    display: "caelondev",
    href: "https://discord.com/users/1264839050427367570",
  },
  {
    platform: "youtube",
    display: "youtube.com/caelondev",
    href: "https://youtube.com/@caelondev",
  },
  {
    platform: "github",
    display: "github.com/caelondev",
    href: "https://github.com/caelondev",
  },
];

export default function Contact({}: CommandContext) {
  return (
    <>
      <p>want to work together or just say hi?</p>
      <Empty />

      {contacts.map((c) => (
        <p key={c.platform}>
          {c.href ? (
            <Link href={c.href} className="contact-platform-link">
              {c.platform}
            </Link>
          ) : (
            <span className="contact-platform">{c.platform}</span>
          )}
          {" — "}
          <span className="contact-value">{c.display}</span>
        </p>
      ))}
    </>
  );
}
