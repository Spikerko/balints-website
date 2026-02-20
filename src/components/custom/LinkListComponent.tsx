import LinkList from "@/definitions/LinkList"
import BioLink from "@/components/custom/BioLink"

const LinkListComponent = () => {
    return (
        <>
            {LinkList.map((link, index) => (
                <BioLink
                    key={index}
                    text={link.name}
                    href={link.href}
                    target={link.target ?? "_blank"}
                    {...(link.icon ? { icon: link.icon } : {})}
                    variant={link.variant ?? "secondary"}
                    color={link.color ?? null}
                    className="cursor-target"
                />
            ))}
        </>
    )
}

export default LinkListComponent;