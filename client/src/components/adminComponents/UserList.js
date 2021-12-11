import { Table } from "antd";
import { useState } from "react";

const UserList = (params) => {
    const [page, setPage] = useState(1)
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      
      const data = [];
      for (let i = 0; i < 20; i++) {
        data.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`,
        });
      }
      

      return ( 
        <div className="flexRowCenter" style={{height: '95%', width: '100%', marginTop: '10px' }}>
          <Table 
            dataSource={data} 
            columns={columns} 
            // loading = {true}
            pagination = {{
                current: page,
                pageSize : 9,
                onChange: (page)=> setPage(page)
            }}
          />
        </div>
      )
}
export default UserList