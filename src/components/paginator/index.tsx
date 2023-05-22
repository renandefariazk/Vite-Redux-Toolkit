import React, { useCallback } from 'react';
// import { Pagination } from 'contracts/Pagination';
import { Pagination } from '../../interface/paginate';
import * as S from './styles';
// import { useTranslation } from 'react-i18next';

interface Props {
  pagination?: Pagination | undefined;
  onPageChange?: (page: number) => void;
  neighbors?: number;
}

export const Paginator: React.FC<Props> = ({
  pagination,
  onPageChange,
  neighbors = 2,
}) => {
  const handleClick = useCallback(
    (page: number): void => {
      onPageChange && onPageChange(page);
    },
    [onPageChange]
  );

  const ButtonsPresenter = useCallback((): JSX.Element => {
    if (!pagination) return <></>;
    // const { i18n,t } = useTranslation();

    const { current_page, last_page } = pagination;
    // if (last_page <= 1) return <></>;

    const targetSize = neighbors * 2;
    const middle = Math.floor(targetSize / 2);
    const paginatorArray = [];

    let start = current_page > middle ? current_page - middle : 1;
    start = start > last_page - targetSize ? last_page - targetSize : start;
    start = start < 1 ? 1 : start;
    let p = start + targetSize;
    p = last_page < p ? last_page : p;
    for (let i = start; i <= p; i++) {
      paginatorArray.push(i);
    }


    return (
      <S.Container>
        <>
          <S.AltButton
            key="first"
            disabled={current_page === 1}
            onClick={() => handleClick(1)}
          >
            {/* {t('page.first')} */}
            {"Primeira Pagina"}
          </S.AltButton>
          {paginatorArray.map((i) => (
            <S.Button
              key={i}
              active={current_page === i}
              onClick={() => handleClick(i)}
            >
              {i}
            </S.Button>
          ))}
          <S.AltButton
            key="last"
            disabled={current_page === last_page}
            onClick={() => handleClick(last_page)}
          >
           {/* {t('page.last')} */}
           {"Última Pag"}
          </S.AltButton>
        </>
      </S.Container>
    );
  }, [handleClick, neighbors, pagination]);

  return <ButtonsPresenter />;
};





// exemplo de Uso
// filter e um redux que so receber as informaçoes e não faz request em um axios
// e cada vez que um esse state muda "filterData", faz uma request utilizando o useEffect e
// o redux que tem o action de fazer o request que nesse caso seria o ProductsActions
// utilizando o redux com o state do filtro filterData

// const fetchOrders = useCallback(() => {
//   dispatch(ProductsActions.request(filterData));
// }, [dispatch, filterData]);

// useEffect(() => fetchOrders(), [filterData]);

// const handlePageChange = useCallback((page: number) => {
//   dispatch(OrderFilterActions.setFilterData({...filterData, page}))
// }, [dispatch, filterData]);

// const { data: products, loading, meta } = useSelector((state: RootState) => state.productsList);

// <Paginator onPageChange={handlePageChange} pagination={meta} />


// exemplo do que e o meta, e o que vem no interface Paginate, pode ser adaptado

// export interface ProductsState {
//   data: ProductData[] | null;
//   meta: Pagination | any;
//   loading: boolean;
//   error: string | null;
// }