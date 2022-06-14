import { useEffect } from "react";
import { getStatistics } from "../../redux/actions";
import {connect} from "react-redux";

function Statistic(props) {

    let { statistics, getStatistics } = props

    useEffect(() => {
        getStatistics()
    }, [])

    return <>
        <div className="col-12 mt-4 table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Message</th>
                        <th >Time</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map(statistic => (
                        <tr key={statistic.id}>
                            <th >{statistic.id}</th>
                            <td>{statistic.message}</td>
                            <td>{statistic.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

const mapStateToProps = (state) => {
    return {
        statistics: state.statistic.statistics
    };
};

const mapDispatchToProps = {
    getStatistics
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);