import { CollapsibleFilter } from '../CollapsibleFilter/CollapsibleFilter';
import { useSelector } from 'react-redux';
import { StickyOptions } from '../StickyOptions/StickyOptions';
import {
  selectTrendsFocus,
  selectTrendsLens,
} from '../../../reducers/trends/selectors';
import { selectFiltersCompany } from '../../../reducers/filters/selectors';
import { useGetAggregations } from '../../../api/hooks/useGetAggregations';
import { AsyncTypeahead } from '../../Typeahead/AsyncTypeahead/AsyncTypeahead';

const FIELD_NAME = 'company';

export const Company = () => {
  const { data, error } = useGetAggregations();
  const filters = useSelector(selectFiltersCompany);
  const focus = useSelector(selectTrendsFocus);
  const lens = useSelector(selectTrendsLens);
  const aggsCompany = error ? [] : data?.company || [];
  const options = structuredClone(aggsCompany);
  const isFocusPage = focus && lens === 'Company';

  options.forEach((opt) => {
    opt.disabled = Boolean(isFocusPage && opt.key !== focus);
  });

  const desc = 'The complaint is about this company.';

  return (
    <CollapsibleFilter
      title="Company name"
      desc={desc}
      className="aggregation company"
    >
      <AsyncTypeahead
        fieldName={FIELD_NAME}
        id="filter-company-typeahead"
        label="Start typing to begin listing companies"
        placeholder="Enter company name"
        ariaLabel="Company Search"
        htmlId={FIELD_NAME + '-typeahead'}
      />
      <StickyOptions
        fieldName={FIELD_NAME}
        options={options}
        selections={filters}
      />
    </CollapsibleFilter>
  );
};
