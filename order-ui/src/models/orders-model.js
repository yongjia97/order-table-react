
const initialState = {
    orderList:[],
    isLoading: false,
    sortConfig: {}
};
export default {
    state: initialState,
    reducers: {

        setOrderList(state, payload) {
            return {
                ...state,
                orderList: payload
            };
        },
        setIsLoading(state, payload) {
            return {
                ...state,
                isLoading: payload
            };
        },
        setSortConfig(state, payload) {
            return {
                ...state,
                sortConfig: payload
            };
        }
    },
    effects: dispatch => ({
        async search(_, rootState) {
            const { sortConfig} = rootState.OrdersModel;
            try {
              dispatch.OrdersModel.setIsLoading(true);
              let url = '/orders';
              if(sortConfig.key !== undefined){
                url += `?sort=${sortConfig.key}&direction=${sortConfig.direction}`;
              }
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();
                dispatch.OrdersModel.setOrderList(data);
              } else {
               console.error("Failed to fetch orders");
              }
            } catch (err) {
              if (err && err.response) {
                throw new Error("An error occured[OrdersModel.search]" + err);
                }
            }
            finally {
                dispatch.OrdersModel.setIsLoading(false);
            }
          },
    //     async loadImage(id, rootState) {
    //         try {
    //             const response = await fetch(`/images/${id}`,
    //             {
    //                 Accept: 'image/jpeg',            
    //             }
    //             );
    //         } catch(err) {
    //          if (err && err.response) {
    //              throw new Error("An error occured[OrdersModel.loadImage]" + err);
    //         }
    //     }
    // }   
    })
}