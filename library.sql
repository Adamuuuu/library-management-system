-- 图书表
CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100),
    Author VARCHAR(50),
    Price DECIMAL(8, 2),
    Publisher VARCHAR(100),
    Summary TEXT,
    TotalCopies INT,
    AvailableCopies INT
);

-- 书架表
-- CREATE TABLE Bookshelf (
--     ShelfID VARCHAR(10) PRIMARY KEY,
--     Type VARCHAR(50)
-- );

-- 读者表
CREATE TABLE Readers (
    ReaderID INT PRIMARY KEY,
    Name VARCHAR(50),
    Gender VARCHAR(10),
    Organization VARCHAR(100),
    Type VARCHAR(20),
    MaxBorrowLimit INT,
    CurrentBorrowCount INT,
    Password VARCHAR(50),
    Debt DECIMAL(8, 2)
);

-- 借还申请表

CREATE TABLE Borrowings (
    BorrowID INT PRIMARY KEY,
    ReaderID INT,
    BookID INT,
    BorrowDate DATE,
    DueDate DATE,
    ReturnDate DATE,
    FineAmount DECIMAL(8, 2),
    FOREIGN KEY (ReaderID) REFERENCES Readers(ReaderID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- 工作人员表

CREATE TABLE LibraryManagers (
    ManagerID INT PRIMARY KEY,
    Name VARCHAR(50),
    Password VARCHAR(50)
);

-- 插入图书表数据

INSERT INTO Books (BookID, Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies)
VALUES 
(1, '天龙八部', '金庸', 39.99, '出版社A', '《天龙八部》是金庸先生创作的武侠小说，讲述了乔峰、段誉等人的故事。', 5, 3),
(2, '笑傲江湖', '金庸', 29.99, '出版社B', '《笑傲江湖》是金庸先生创作的武侠小说，以剑术为主线，讲述了令狐冲的传奇经历。', 8, 8),
(3, '神雕侠侣', '金庸', 34.99, '出版社C', '《神雕侠侣》是金庸先生创作的武侠小说，以郭靖、黄蓉的爱情故事为主线。', 10, 10),
(4, '陆小凤传奇', '古龙', 19.99, '出版社A', '《陆小凤传奇》是古龙先生创作的武侠小说，讲述了陆小凤的江湖冒险故事。', 3, 2),
(5, '流星蝴蝶剑', '古龙', 24.99, '出版社B', '《流星蝴蝶剑》是古龙先生创作的武侠小说，以剑术为主线，讲述了李寻欢的江湖传奇。', 15, 12),
(6, '倚天屠龙记', '金庸', 39.99, '出版社C', '《倚天屠龙记》是金庸先生创作的武侠小说，讲述了张无忌与倚天剑之间的纠葛。', 12, 10),
(7, '白眉大侠', '古龙', 29.99, '出版社A', '《白眉大侠》是古龙先生创作的武侠小说，以白眉鹰王的传奇故事为主线。', 7, 7),
(8, '侠客行', '金庸', 34.99, '出版社B', '《侠客行》是金庸先生创作的武侠小说，以少林寺的英雄事迹为主线。', 9, 9),
(9, '绝代双骄', '古龙', 19.99, '出版社C', '《绝代双骄》是古龙先生创作的武侠小说，讲述了程英、楚留香的爱情故事。', 5, 4),
(10, '碧血剑', '金庸', 24.99, '出版社A', '《碧血剑》是金庸先生创作的武侠小说，以四大门派之间的争斗为背景。', 11, 8),
(11, '多情剑客无情剑', '古龙', 29.99, '出版社B', '《多情剑客无情剑》是古龙先生创作的武侠小说，讲述了胡斐与程灵素的爱情故事。', 6, 5),
(12, '神雕大侠', '金庸', 34.99, '出版社C', '《神雕大侠》是金庸先生创作的武侠小说，以郭襄和杨过的爱情为主线。', 13, 11),
(13, '残阳剑主', '古龙', 19.99, '出版社A', '《残阳剑主》是古龙先生创作的武侠小说，讲述了剑主的江湖历险。', 4, 3),
(14, '飞狐外传', '金庸', 24.99, '出版社B', '《飞狐外传》是金庸先生创作的武侠小说，以飞狐一族的兴衰为背景。', 10, 9),
(15, '绝世唐门传奇', '古龙', 29.99, '出版社C', '《绝世唐门传奇》是古龙先生创作的武侠小说，讲述了唐门的崛起与传承。', 8, 6),
(16, '射雕英雄传', '金庸', 34.99, '出版社A', '《射雕英雄传》是金庸先生创作的武侠小说，以郭靖与黄蓉的英雄事迹为主线。', 15, 13),
(17, '萧十一郎', '古龙', 19.99, '出版社B', '《萧十一郎》是古龙先生创作的武侠小说，讲述了萧十一郎的江湖故事。', 7, 6),
(18, '神犬小七', '琼瑶', 24.99, '出版社C', '《神犬小七》是琼瑶先生创作的小说，以小七与主人的感人故事为主线。', 10, 9),
(19, '倩女幽魂', '梁羽生', 29.99, '出版社A', '《倩女幽魂》是梁羽生先生创作的仙侠小说，讲述了李逍遥与小龙女之间的爱情与命运。', 12, 11),
(20, '风云天地', '金庸', 34.99, '出版社B', '《风云天地》是金庸先生创作的武侠小说，以武林中各派势力的明争暗斗为背景。', 9, 8);

-- 插入读者表（Readers）

INSERT INTO Readers (ReaderID, Name, Gender, Organization, Type, MaxBorrowLimit, CurrentBorrowCount, Password, Debt)
VALUES
(1, '孙悟空', '男', '花果山', '神仙', 5, 2, 'password1', 0.00),
(2, '猪八戒', '男', '高老庄', '神仙', 10, 3, 'password2', 0.00),
(3, '沙和尚', '男', '流沙河', '神仙', 7, 0, 'password3', 0.00),
(4, '唐僧', '男', '大唐王朝', '人类', 3, 1, 'password4', 0.00),
(5, '白龙马', '男', '西天取经团', '妖怪', 15, 5, 'password5', 0.00),
(6, '贝吉塔', '男', '超级赛亚人', '外星人', 8, 2, 'password6', 0.00),
(7, '孙悟饭', '男', '地球', '人类', 5, 1, 'password7', 0.00),
(8, '布尔玛', '女', '地球', '人类', 6, 3, 'password8', 0.00),
(9, '卡卡罗特', '男', '地球', '赛亚人', 7, 0, 'password9', 0.00),
(10, '比克', '男', '地球', '人类', 4, 2, 'password10', 0.00),
(11, '克林', '男', '地球', '人类', 5, 1, 'password11', 0.00),
(12, '18号', '女', '地球', '人造人', 3, 0, 'password12', 0.00),
(13, '特兰克斯', '男', '地球', '人类', 9, 6, 'password13', 0.00),
(14, '琪琪', '女', '地球', '神仙', 6, 2, 'password14', 0.00),
(15, '悟天', '男', '地球', '人类', 4, 1, 'password15', 0.00),
(16, '亚姆查', '男', '地球', '神仙', 8, 3, 'password16', 0.00),
(17, '贝吉塔（未来）', '男', '未来世界', '战士', 5, 2, 'password17', 0.00),
(18, '特兰克斯（未来）', '男', '未来世界', '战士', 7, 1, 'password18', 0.00),
(19, '孙悟空（GT）', '男', '地球', '神仙', 6, 4, 'password19', 0.00),
(20, '特兰克斯（GT）', '男', '地球', '人类', 5, 3, 'password20', 0.00);




INSERT INTO Borrowings (BorrowID, ReaderID, BookID, BorrowDate, DueDate, ReturnDate, FineAmount)
VALUES
(1, 1, 2, '2023-06-01', '2023-06-15', NULL, 0.00),
(2, 2, 4, '2023-06-02', '2023-06-16', '2023-06-15', 0.00),
(3, 3, 1, '2023-06-05', '2023-06-19', NULL, 0.00),
(4, 4, 3, '2023-06-07', '2023-06-21', '2023-06-18', 2.50),
(5, 5, 6, '2023-06-10', '2023-06-24', NULL, 0.00),
(6, 6, 8, '2023-06-12', '2023-06-26', '2023-06-23', 1.50),
(7, 7, 12, '2023-06-15', '2023-06-29', NULL, 0.00),
(8, 8, 14, '2023-06-18', '2023-07-02', NULL, 0.00),
(9, 9, 16, '2023-06-20', '2023-07-04', '2023-07-01', 1.00),
(10, 10, 19, '2023-06-23', '2023-07-07', NULL, 0.00),
(11, 11, 20, '2023-06-25', '2023-07-09', NULL, 0.00),
(12, 12, 4, '2023-06-28', '2023-07-12', NULL, 0.00),
(13, 13, 8, '2023-06-30', '2023-07-14', NULL, 0.00),
(14, 14, 11, '2023-07-03', '2023-07-17', NULL, 0.00),
(15, 15, 14, '2023-07-05', '2023-07-19', NULL, 0.00),
(16, 16, 17, '2023-07-08', '2023-07-22', '2023-07-20', 0.50),
(17, 17, 18, '2023-07-10', '2023-07-24', NULL, 0.00),
(18, 18, 20, '2023-07-13', '2023-07-27', NULL, 0.00),
(19, 19, 5, '2023-07-15', '2023-07-29', NULL, 0.00),
(20, 20, 7, '2023-07-18', '2023-08-01', NULL, 0.00);

-- 新增管理员
INSERT INTO LibraryManagers (ManagerID, Name, Password)
VALUES 
(1, '管理员一号', 'admin123'),
(2, '管理员二号', 'pass1234'),
(3, '管理员三号', 'abc@123'),
(4, '管理员四号', 'library2023'),
(5, '管理员五号', 'password');
