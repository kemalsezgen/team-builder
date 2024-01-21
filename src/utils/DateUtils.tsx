// convertTo DDMMYYYY HH:MM format 
export const convertToDDMMYYYYHHMM = (postDate: any) => {
  var day = postDate.getDate().toString().padStart(2, '0'); 
  var month = postDate.toLocaleString('default', { month: 'short' }); 
  var year = postDate.getFullYear(); 
  var hour = postDate.getHours().toString().padStart(2, '0'); 
  var minute = postDate.getMinutes().toString().padStart(2, '0'); 

  var formattedDate = day + ' ' + month + ' ' + year + ' ' + hour + ':' + minute; // İstenen format birleştiriliyor.
  return (formattedDate);
}