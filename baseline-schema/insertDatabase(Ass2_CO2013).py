import pandas as pd
from sqlalchemy import create_engine

# connection_string = 'mssql+pyodbc://localhost:1433/Ass2_CO2013?driver=ODBC+Driver+17+for+SQL+Server'
connection_string = 'mssql+pyodbc://SA:Str0ngPassword@localhost:1433/Ass2_CO2013?driver=ODBC+Driver+18+for+SQL+Server&encrypt=no'
engine = create_engine(connection_string)

def user():
    user = pd.read_excel('user.xlsx')
    user = user[['full_name', 'password', 'phone_number', 'user_sex']].copy()

    try:
        user.to_sql('user', con=engine, if_exists='append', index=False)
        print("User data has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def user_contact():
    user_contact = pd.read_excel('user_contact.xlsx')
    user_contact = user_contact[['contact_email', 'contact_phone_number', 'social_media_link', 'user_id']].copy()
    try:
        user_contact.to_sql('user_contact', con=engine, if_exists='append', index=False)
        print("User contact data has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def staff():
    staff = pd.read_excel('staff.xlsx')
    staff = staff[['date_of_birth', 'national_id', 'place_of_origin', 'profile_photo_url', 'staff_id']].copy()
    staff['date_of_birth'] = pd.to_datetime(staff['date_of_birth'], format='%d/%m/%Y') #chuyển về dạng datetime
    try:
        staff.to_sql('staff', con=engine, if_exists='append', index=False)
        print("Staff data has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def administrator():
    administrator = pd.read_excel('administrator.xlsx')
    administrator = administrator[['admin_id']].copy()
    try:
        administrator.to_sql('administrator', con=engine, if_exists='append', index=False)
        print("administrator has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def week_day():
    week_day = pd.read_excel('week_day.xlsx')
    week_day = week_day[['name']].copy()
    try:
        week_day.to_sql('week_day', con=engine, if_exists='append', index=False)
        print("week_day has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def province():
    province = pd.read_excel('province.xlsx')
    province = province[['pro_name']].copy()
    try:
        province.to_sql('province', con=engine, if_exists='append', index=False)
        print("province has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def district_city():
    district_city = pd.read_excel('district_city.xlsx')
    district_city = district_city[['dist_city_id', 'name', 'pro_id']].copy()
    try:
        district_city.to_sql('district_city', con=engine, if_exists='append', index=False)
        print("district_city has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def ward():
    ward = pd.read_excel('ward.xlsx')
    ward = ward[['ward_id', 'ward_name', 'dist_city_id', 'pro_id']].copy()
    try:
        ward.to_sql('ward', con=engine, if_exists='append', index=False)
        print("ward has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def address():
    address = pd.read_excel('address.xlsx')
    address = address[['house_number', 'str_name', 'user_id', 'dist_city_id', 'pro_id', 'ward_id']].copy()
    try:
        address.to_sql('address', con=engine, if_exists='append', index=False)
        print("address has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def time_slot():
    time_slot = pd.read_excel('time_slot.xlsx')
    time_slot = time_slot[['end_time', 'start_time']].copy()
    try:
        time_slot.to_sql('time_slot', con=engine, if_exists='append', index=False)
        print("time_slot has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def certificate_type():
    certificate_type = pd.read_excel('certificate_type.xlsx')
    certificate_type = certificate_type[['ct_name']].copy()
    try:
        certificate_type.to_sql('certificate_type', con=engine, if_exists='append', index=False)
        print("certificate_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def class_type():
    class_type = pd.read_excel('class_type.xlsx')
    class_type = class_type[['class_type_name']].copy()
    try:
        class_type.to_sql('class_type', con=engine, if_exists='append', index=False)
        print("class_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def subject():
    subject = pd.read_excel('subject.xlsx')
    subject = subject[['subject_name']].copy()
    try:
        subject.to_sql('subject', con=engine, if_exists='append', index=False)
        print("subject has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def teaching_style():
    teaching_style = pd.read_excel('teaching_style.xlsx')
    teaching_style = teaching_style[['ts_name']].copy()
    try:
        teaching_style.to_sql('teaching_style', con=engine, if_exists='append', index=False)
        print("steaching_style has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def student():
    student = pd.read_excel('student.xlsx')
    student = student[['stu_grade', 'stu_school', 'student_id']].copy()
    try:
        student.to_sql('student', con=engine, if_exists='append', index=False)
        print("student has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def educational_institution():
    educational_institution = pd.read_excel('educational_institution.xlsx')
    educational_institution = educational_institution[['edi_name']].copy()
    try:
        educational_institution.to_sql('educational_institution', con=engine, if_exists='append', index=False)
        print("educational_institution has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def consultation_req():
    consultation_req = pd.read_excel('consultation_req.xlsx')
    consultation_req = consultation_req[['cq_status', 'requirement', 'addr_id', 'student_id']].copy()
    try:
        consultation_req.to_sql('consultation_req', con=engine, if_exists='append', index=False)
        print("consultation_req has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def wants_subject():
    wants_subject = pd.read_excel('wants_subject.xlsx')
    wants_subject = wants_subject[['cq_id', 'subject_id']].copy()
    try:
        wants_subject.to_sql('wants_subject', con=engine, if_exists='append', index=False)
        print("wants_subject has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def wants_type():
    wants_type = pd.read_excel('wants_type.xlsx')
    wants_type = wants_type[['cq_id', 'class_type_id']].copy()
    try:
        wants_type.to_sql('wants_type', con=engine, if_exists='append', index=False)
        print("wants_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def wants_style():
    wants_style = pd.read_excel('wants_style.xlsx')
    wants_style = wants_style[['cq_id', 'ts_id']].copy()
    try:
        wants_style.to_sql('wants_style', con=engine, if_exists='append', index=False)
        print("wants_style has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def tutor():
    tutor = pd.read_excel('tutor.xlsx')
    tutor['date_joined'] = pd.to_datetime(tutor['date_joined'], format='%d/%m/%Y') #chuyển về dạng datetime
    tutor = tutor[['bio', 'date_joined', 'inviting_code', 'n_of_invitations', 'rate', 'tutor_id', 'invited_code']].copy()
    try:
        tutor.to_sql('tutor', con=engine, if_exists='append', index=False)
        print("tutor has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def voucher():
    voucher = pd.read_excel('voucher.xlsx')
    voucher = voucher[['vou_discount', 'vou_status', 'tutor_id']].copy()
    try:
        voucher.to_sql('voucher', con=engine, if_exists='append', index=False)
        print("voucher has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def tutor_application():
    tutor_application = pd.read_excel('tutor_application.xlsx')
    tutor_application = tutor_application[['requirement', 'ta_status', 'addr_id', 'student_id', 'ts_id', 'tutor_id']].copy()
    try:
        tutor_application.to_sql('tutor_application', con=engine, if_exists='append', index=False)
        print("tutor_application has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def can_teach_at():
    can_teach_at = pd.read_excel('can_teach_at.xlsx')
    can_teach_at = can_teach_at[['tutor_id', 'dist_city_id', 'pro_id']].copy()
    try:
        can_teach_at.to_sql('can_teach_at', con=engine, if_exists='append', index=False)
        print("can_teach_at has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def can_teach_style():
    can_teach_style = pd.read_excel('can_teach_style.xlsx')
    can_teach_style = can_teach_style[['tutor_id', 'ts_id']].copy()
    try:
        can_teach_style.to_sql('can_teach_style', con=engine, if_exists='append', index=False)
        print("can_teach_style has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def can_teach_type():
    can_teach_type = pd.read_excel('can_teach_type.xlsx') 
    can_teach_type = can_teach_type[['tutor_id', 'class_type_id']].copy()
    try:
        can_teach_type.to_sql('can_teach_type', con=engine, if_exists='append', index=False)
        print("can_teach_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def certificate():
    certificate = pd.read_excel('certificate.xlsx')
    certificate = certificate[['cert_id', 'cert_year', 'cert_grade', 'tutor_id', 'ct_id']].copy()
    try:
        certificate.to_sql('certificate', con=engine, if_exists='append', index=False)
        print("certificate has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def bill():
    bill = pd.read_excel('bill.xlsx') 
    bill = bill[['bill_money', 'bill_photo_url', 'bill_status', 'bill_type', 'admin_id', 'vou_id']].copy()
    try:
        bill.to_sql('bill', con=engine, if_exists='append', index=False)
        print("bill has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def can_teach():
    can_teach = pd.read_excel('can_teach.xlsx')
    can_teach = can_teach[['tutor_id', 'subject_id']].copy()
    try:
        can_teach.to_sql('can_teach', con=engine, if_exists='append', index=False)
        print("can_teach has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def degree():
    degree = pd.read_excel('degree.xlsx')  # Assuming your file is named 'degree.xlsx'
    degree = degree[['degr_id', 'degr_major_name', 'degr_type', 'degr_year', 'tutor_id', 'edi_code']].copy()
    try:
        degree.to_sql('degree', con=engine, if_exists='append', index=False)
        print("degree has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def has():
    has = pd.read_excel('has.xlsx')
    has = has[['tutor_id', 'edi_code']].copy()
    try:
        has.to_sql('has', con=engine, if_exists='append', index=False)
        print("has has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def qualification():
    qualification = pd.read_excel('qualification.xlsx')
    qualification = qualification[['qualification', 'tutor_id']].copy()
    try:
        qualification.to_sql('qualification', con=engine, if_exists='append', index=False)
        print("qualification has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def class_data():
    class_data = pd.read_excel('class.xlsx')  
    class_data['date_start'] = pd.to_datetime(class_data['date_start'], format='%d/%m/%Y') #chuyển về dạng datetime
    class_data = class_data[['class_deposit', 'class_status', 'commission_fee', 'requirements', 'date_start', 'salary', 'addr_id', 'student_id', 'ts_id', 'tutor_id']].copy()
    try:
        class_data.to_sql('class', con=engine, if_exists='append', index=False)
        print("class has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def belongs_to():
    belongs_to = pd.read_excel('belongs_to.xlsx')
    belongs_to = belongs_to[['bill_id', 'class_id', 'tutor_id']].copy()
    try:
        belongs_to.to_sql('belongs_to', con=engine, if_exists='append', index=False)
        print("belongs_to has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def is_held_on():
    is_held_on = pd.read_excel('is_held_on.xlsx')
    is_held_on = is_held_on[['class_id', 'week_id', 'slot_id']].copy()
    try:
        is_held_on.to_sql('is_held_on', con=engine, if_exists='append', index=False)
        print("is_held_on has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def tutor_review():
    tutor_review = pd.read_excel('tutor_review.xlsx')  
    tutor_review['time_stamp'] = pd.to_datetime(tutor_review['time_stamp'], format='%d/%m/%Y') #chuyển về dạng datetime
    tutor_review = tutor_review[['comment', 'rate', 'time_stamp', 'class_id', 'student_id']].copy() 
    try:
        tutor_review.to_sql('tutor_review', con=engine, if_exists='append', index=False)
        print("tutor_review has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def has_class_type():
    has_class_type = pd.read_excel('has_class_type.xlsx')
    has_class_type = has_class_type[['class_id', 'class_type_id']].copy()
    try:
        has_class_type.to_sql('has_class_type', con=engine, if_exists='append', index=False)
        print("has_class_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def has_subject():
    has_subject = pd.read_excel('has_subject.xlsx')
    has_subject = has_subject[['class_id', 'subject_id']].copy()
    try:
        has_subject.to_sql('has_subject', con=engine, if_exists='append', index=False)
        print("has_subject has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def teaching_application():
    teaching_application = pd.read_excel('teaching_application.xlsx')
    teaching_application['date_of_creation'] = pd.to_datetime(teaching_application['date_of_creation'], format='%d/%m/%Y') #chuyển về dạng datetime
    teaching_application = teaching_application[['application_status', 'date_of_creation', 'class_id', 'tutor_id']].copy()

    try:
        teaching_application.to_sql('teaching_application', con=engine, if_exists='append', index=False)
        print("teaching_application has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def s_wants_subject():
    s_wants_subject = pd.read_excel('s_wants_subject.xlsx')
    s_wants_subject = s_wants_subject[['ta_id', 'subject_id']].copy()
    try:
        s_wants_subject.to_sql('s_wants_subject', con=engine, if_exists='append', index=False)
        print("s_wants_subject has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

def s_wants_type():
    s_wants_type = pd.read_excel('s_wants_type.xlsx')
    s_wants_type = s_wants_type[['ta_id', 'class_type_id']].copy()
    try:
        s_wants_type.to_sql('s_wants_type', con=engine, if_exists='append', index=False)
        print("s_wants_type has been inserted successfully!")
    except Exception as e:
        print(f"Error occurred during insertion: {e}")

# Call the function to insert data
user()
user_contact()
staff()
administrator()
week_day()
province()
district_city()
ward()
address()
time_slot()
certificate_type()
class_type()
subject()
teaching_style()
student()
educational_institution()
consultation_req()
wants_subject()
wants_type()
wants_style()
tutor()
voucher()
tutor_application()
can_teach_at()
can_teach_style()
can_teach_type()
certificate()
bill()
can_teach()
degree()
has()
qualification()
class_data()
belongs_to()
is_held_on()
tutor_review()
has_class_type()
has_subject()
teaching_application()
s_wants_subject()
s_wants_type()