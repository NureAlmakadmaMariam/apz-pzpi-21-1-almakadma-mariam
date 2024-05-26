
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TaskStatusReport } from '../../interfaces/Report';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from '../../styles/TaskStatusReportPage.module.css';


ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskStatusChartProps {
    data: TaskStatusReport[];
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ data }) => {
    const intl = useIntl();

    const translateStatus = (status: string): string => {
        return intl.formatMessage({ id: `taskStatus.${status}` });
    };

    const chartData = {
        labels: data.map(item => translateStatus(item.status)),
        datasets: [
            {
                label: 'Task Status',
                data: data.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className={styles.chartContainer}>
            <Pie data={chartData} options={chartOptions} />
            <div className={styles.customLegend}>
                {data.map((item, index) => (
                    <div key={index} className={styles.legendItem}>
                        <span
                            className={styles.legendColorBox}
                            style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                        ></span>
                        <span>
                            <FormattedMessage id={`taskStatus.${item.status}`} />: {item.count} = {item.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskStatusChart;