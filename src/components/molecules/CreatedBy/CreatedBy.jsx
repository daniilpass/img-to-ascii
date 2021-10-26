import React from "react";
import { common } from "../../../settings";
import Link from "../../atoms/Link";

export function CreatedBy() {
    return (
        <div className="created-by">
            <Link link={common.createdBy.link} title={common.createdBy.title} />
        </div>
        
    )
}