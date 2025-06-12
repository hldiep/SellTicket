import React from 'react'

const AQs = () => {
    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className={"container"}>
                <div className='text-white p-6 mt-20'>
                    <div className="mt-16 max-w-4xl mx-auto mb-10">
                        <h2 className="text-3xl text-white font-bold text-center mb-8">Câu Hỏi Thường Gặp</h2>
                        <div className="space-y-6">
                            {[
                                { question: "Làm thế nào để đặt vé trên trang web?", answer: "Bạn chỉ cần chọn phim, chọn rạp, suất chiếu và ghế ngồi, sau đó thanh toán online là xong!" },
                                { question: "Tôi có thể đổi hoặc hủy vé sau khi đặt không?", answer: "Tùy vào chính sách của rạp, bạn có thể đổi hoặc hoàn vé trong một số trường hợp." },
                                { question: "Những phương thức thanh toán nào được hỗ trợ?", answer: "Chúng tôi hỗ trợ thanh toán qua ví điện tử (Momo, ZaloPay), thẻ ngân hàng, hoặc thanh toán trực tiếp tại rạp." }
                            ].map((faq, index) => (
                                <div key={index} className="p-4 border border-gray-700 rounded-lg">
                                    <h3 className="text-lg font-semibold text-yellow-400">Q: {faq.question}</h3>
                                    <p className="text-gray-300">A: {faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AQs