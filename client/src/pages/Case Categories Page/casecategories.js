import './casecategories.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function CaseCategories() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        // Navigate to the progress page with the caseCategory as a URL parameter
        navigate(`/progress?caseCategory=${encodeURIComponent(category.trim())}`);
    };

    const handleViewAllClick = () => {
        // Navigate to the progress page without any specific caseCategory
        navigate('/progress');
    };

    return (
        <div className='casewhole'>
            <div className='categorieswhole'>
                <div className='cc'>
                    <h1>Case Categories</h1>
                </div>
                <div className='cases'>
                    <div className='case1' onClick={() => handleCategoryClick('Victim Survivors')}>
                        <div className='no1'>
                            <img src="/Pic/filipino.jpg" alt="Victim Survivors"></img>
                            <label>Victim Survivors</label>
                        </div>
                    </div>

                    <div className='case1' onClick={() => handleCategoryClick('Children in Conflict')}>
                        <div className='no1'>
                            <img src="/Pic/filipino.jpg" alt="Children in Conflict"></img>
                            <label>Children in Conflict</label>
                        </div>
                    </div>

                    <div className='case1' onClick={() => handleCategoryClick('Person Who Used Drugs')}>
                        <div className='no1'>
                            <img src="/Pic/filipino.jpg" alt="Person Who Used Drugs"></img>
                            <label>Person Who Used Drugs</label>
                        </div>
                    </div>

                    <div className='case1' onClick={() => handleCategoryClick('Special Cases')}>
                        <div className='no1'>
                            <img src="/Pic/filipino.jpg" alt="Special Cases"></img>
                            <label>Special Cases</label>
                        </div>
                    </div>

                    <div className='case1' onClick={handleViewAllClick}>
                        <div className='no1'>
                            <img src="/Pic/filipino.jpg" alt="View All Cases"></img>
                            <label>View All Cases</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseCategories;
