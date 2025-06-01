import {RiCalendarView} from "react-icons/ri";
import {SlPrinter} from "react-icons/sl";
import {IoClose} from "react-icons/io5";
import {MdAddToPhotos, MdOutlineEdit} from "react-icons/md";
import CustomInput from "../inputs/CustomInput";
import {Controller} from "react-hook-form";
import {VscDebugContinueSmall} from "react-icons/vsc";

interface IProps {
  bodyData: Record<string, any>[];
  headData: { title: string; key: string, numberInput?: boolean, name?: string }[];
  RowNumber?: boolean;
  pagination?: boolean;
  currentPage?: number; // ← صفحه فعلی
  totalPages?: number; // ← تعداد کل صفحات
  onPageChange?: (page: number) => void; // ← تابع تغییر صفحه
  activities?: boolean;
  print?: object;
  showMassage?: string;
  deleteItem?: () => void;
  control?: any;
  onDelete?: (row: Record<string, any>) => void;
  onPrint?: (row: Record<string, any>) => void;
  onView?: (row: Record<string, any>) => void;
  onAdd?: (row: Record<string, any>) => void;
  onEdit?: (row: Record<string, any>) => void;
  onContinue?: (row: Record<string, any>) => void;
}


const DataGrid = ({
                    bodyData,
                    headData,
                    RowNumber,
                    pagination,
                    currentPage,
                    totalPages,
                    onPageChange,
                    activities,
                    onView,
                    onPrint,
                    onDelete,
                    onAdd,
                    control,
                    onEdit,
                    onContinue,
                  }: IProps) => {
  return (
    <>
      <div className="max-md:hidden p-2 w-full">
        <div className=" w-full overflow-x-auto ">
          <table className="table-auto w-full text-right text-sm">
            <thead className="bg-black text-white text-sm ">
            <tr className={'text-center'}>
              {RowNumber && <th className="p-1 border !border-goldColor whitespace-nowrap">ردیف</th>}
              {headData?.map((item, index) => (
                <th key={index}
                    className="p-1 !border !border-goldColor whitespace-nowrap">{item.title}</th>
              ))}
              {activities && <th className="p-1 !border !border-goldColor whitespace-nowrap">عملیات</th>}
            </tr>
            </thead>
            <tbody className="text-center">
            {bodyData?.map((item, index) => {
              const showActions = item?.hasActions; // ← شرط نمایش عملیات بر اساس مقدار داده
              return (
                <tr
                  key={index}
                  className={`${item.status === 1 ? 'bg-gray-300' : ''}`}
                >
                  {RowNumber && (
                    <td className="p-1 !border !border-gray-400 whitespace-nowrap">
                      {index + 1}
                    </td>
                  )}
                  {headData.map((headItem, idx) => (
                    <td key={idx} className="p-1 !border !border-gray-400 whitespace-nowrap">
                      {headItem.numberInput ? (
                        <Controller
                          name={`${headItem.name}`}
                          control={control}
                          render={({field: {value, onChange}}) => (
                            <CustomInput type="text" value={value} onChange={onChange}/>
                          )}
                        />
                      ) : (
                        item[headItem.key]
                      )}
                    </td>
                  ))}

                  {/* شرط نمایش ستون عملیات برای هر سطر */}
                  {activities && (
                    <td className="p-1 !border !border-gray-400 whitespace-nowrap">
                      {showActions ? (
                        <div className="flex justify-around items-center">
                          {onEdit && (
                            <MdOutlineEdit
                              className="text-green-700 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onEdit(item)}
                            />
                          )}
                          {onView && (
                            <RiCalendarView
                              className="text-green-700 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onView(item)}
                            />
                          )}
                          {onAdd && (
                            <MdAddToPhotos
                              className="text-green-700 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onAdd(item)}
                            />
                          )}
                          {onPrint && (
                            <SlPrinter
                              className="text-blue-700 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onPrint(item)}
                            />
                          )}
                          {onContinue && (
                            <VscDebugContinueSmall
                              className="text-yellow-500 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onContinue(item)}
                            />
                          )}
                          {onDelete && (
                            <IoClose
                              className="text-red-700 w-6 h-6 mx-2 cursor-pointer"
                              onClick={() => onDelete(item)}
                            />
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">---</span> // اگر نخواستیم دکمه‌ای باشه
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && currentPage && totalPages && totalPages > 1 && onPageChange ? (
          <div className="  flex justify-center bg-sliderColor gap-2 text-sm">
            <div className="py-2  flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  onPageChange(currentPage - 1);
                }}
                className="px-3 m-1 py-1 border border-goldColor rounded hover:bg-gray-100 hover:text-black text-white disabled:opacity-50"
              >
                قبلی
              </button>

              <span className="w-fit p-1 py-1 text-goldColor">{currentPage}</span>
              <span className="px-3 py-1 text-goldColor">...</span>
              <span className="w-fit p-1 py-1 text-goldColor">{totalPages}</span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  onPageChange(currentPage + 1);
                }}
                className="px-3 m-1 py-1 border border-goldColor rounded hover:bg-gray-100 hover:text-black text-white disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className=" md:hidden w-full flex flex-col gap-5 p-1.5 py-4 ">
        {bodyData.map((item, index) => {
          const showActions = item?.hasActions;
          return (
            <div key={index} className="border !border-gray-300 rounded-xl pb-2">
              <div className={'relative '}>
                <div className={'absolute -top-3.5  rounded-full  w-fit px-1.5 bg-gray-100'}>
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                {headData.map((headItem, idx) => (
                  <div key={idx} className="flex justify-between items-center px-2 text-sm">
                    <span className="font-semibold text-gray-600">{headItem.title}:</span>
                    <span className="text-gray-800">
                    {headItem.numberInput ? (
                      <Controller
                        name={`${headItem.name}`}
                        control={control}
                        render={({field: {value, onChange}}) => (
                          <CustomInput type="text" value={value} onChange={onChange}/>
                        )}
                      />
                    ) : (
                      item[headItem.key] ?? "-"
                    )}
                  </span>
                  </div>
                ))}
              </div>

              {showActions && (
                <div className='border-t !border-gray-300 mt-1'>
                  <div className="flex justify-center gap-3  p-2">
                    {onEdit &&
                        <MdOutlineEdit className="text-green-700 w-5 h-5 cursor-pointer" onClick={() => onEdit(item)}/>}
                    {onView &&
                        <RiCalendarView className="text-green-700 w-5 h-5 cursor-pointer"
                                        onClick={() => onView(item)}/>}
                    {onAdd &&
                        <MdAddToPhotos className="text-green-700 w-5 h-5 cursor-pointer" onClick={() => onAdd(item)}/>}
                    {onPrint &&
                        <SlPrinter className="text-blue-700 w-5 h-5 cursor-pointer" onClick={() => onPrint(item)}/>}
                    {onContinue && (
                      <VscDebugContinueSmall
                        className="text-yellow-500 w-5 h-5 cursor-pointer"
                        onClick={() => onContinue(item)}
                      />
                    )}
                    {onDelete &&
                        <IoClose className="text-red-700 w-5 h-5 cursor-pointer" onClick={() => onDelete(item)}/>}

                  </div>
                </div>
              )}

            </div>

          );
        })}

        {pagination && currentPage && totalPages && totalPages > 1 && onPageChange ? (
          <div className=" relative flex justify-center text-sm">
            <div className=" bg-white absolute top-0 gap-2 flex items-center ">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  onPageChange(currentPage - 1);
                }}
                className="px-3  py-1 border border-goldColor rounded hover:bg-gray-100 hover:text-black text-sliderColor disabled:opacity-50"
              >
                قبلی
              </button>

              <span className="w-fit p-1 py-1 text-sliderColor">{currentPage}</span>
              <span className="px-3 py-1 text-sliderColor">...</span>
              <span className="w-fit p-1 py-1 text-sliderColor">{totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  onPageChange(currentPage + 1);
                }}
                className="px-3  py-1 border border-goldColor rounded hover:bg-gray-100 hover:text-black text-sliderColor disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DataGrid;
