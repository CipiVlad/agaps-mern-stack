import { Link, useLocation } from "react-router-dom"
import InputFields from "../../components/InputFields";

import { IoChevronBack } from "react-icons/io5";
import { gckHoles } from "../../models/gck_holes_api";

const ContinueHole = () => {
    const { pathname } = useLocation()
    const { state } = useLocation()

    return (
        <>
            {
                gckHoles.map((hole: any, index: number) => {
                    return (
                        // render only card mathching the pathname
                        pathname === `/hole-card/${hole.hole}` && (
                            <div key={index}>
                                <h2>Course GCK</h2>
                                <h3>Hole {hole.hole} (Par {hole.par})</h3>
                                <InputFields
                                    hole={hole.hole}
                                    par={hole.par}
                                    link={`/hole-card/${hole.hole + 1}`}
                                    state={state}
                                />
                                {
                                    hole.hole === 1
                                        ? null
                                        : <Link to={`/hole-card/${hole.hole - 1}`} state={state}>
                                            <IoChevronBack style={{ fontSize: 26 }} />
                                        </Link>
                                }
                            </div>
                        )

                    )
                })
            }
        </>
    )
}
export default ContinueHole